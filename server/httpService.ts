import { logger } from "@/services/loggerService";
import { AuthTokens } from "@/types/auth";
import { getStoredTokens, setStoredTokens } from "@/services/storageService";
import { twoFactorTimeService } from "@/services/twoFactorTimeService";
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse extends AuthTokens {}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Auth routes that should not trigger 2FA or token refresh
const AUTH_ROUTES = [
  "/auth/login",
  "/auth/2fa/verify",
  "/auth/refresh",
  "/auth/2fa/setup/confirm",
  "/auth/2fa/verify-code",
];

interface FailedQueueItem {
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export interface HttpError {
  response?: {
    status?: number;
    data?: unknown;
  };
  message?: string;
}

// Custom event for auth failure
const AUTH_FAILURE_EVENT = "auth:refresh-failed";
const PERMISSION_DENIED_EVENT = "auth:permission-denied";
export const TWO_FACTOR_REQUIRED_EVENT = "auth:two-factor-required";
export const TWO_FACTOR_SUCCESS_EVENT = "auth:two-factor-success";

export const dispatchAuthFailure = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_FAILURE_EVENT));
  }
};

export const dispatchPermissionDenied = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PERMISSION_DENIED_EVENT));
  }
};

let twoFactorPromise: Promise<void> | null = null;

export const dispatchTwoFactorRequired = () => {
  if (typeof window !== "undefined") {
    // Create a promise that resolves when 2FA is verified
    twoFactorPromise = new Promise((resolve) => {
      window.addEventListener(
        TWO_FACTOR_SUCCESS_EVENT,
        () => {
          resolve();
          twoFactorPromise = null;
        },
        { once: true }
      );
    });

    window.dispatchEvent(new CustomEvent(TWO_FACTOR_REQUIRED_EVENT));
  }
};

export const listenToAuthFailure = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener(AUTH_FAILURE_EVENT, callback);
    return () => window.removeEventListener(AUTH_FAILURE_EVENT, callback);
  }
  return () => {};
};

export const listenToPermissionDenied = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener(PERMISSION_DENIED_EVENT, callback);
    return () => window.removeEventListener(PERMISSION_DENIED_EVENT, callback);
  }
  return () => {};
};

class HttpService {
  public axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedQueueItem[] = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "x-origin": "site-panel-client",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add token and check 2FA
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const tokens = getStoredTokens();
        if (tokens?.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }

        const method = config.method?.toUpperCase();
        const url = config.url || "";
        const isAuthRoute = AUTH_ROUTES.some((route) => url.includes(route));

        if (
          !isAuthRoute &&
          method &&
          twoFactorTimeService.isTwoFactorRequired(method)
        ) {
          dispatchTwoFactorRequired();
          logger.info(`2FA required for ${method} request to ${config.url}`);

          // Wait for 2FA verification before allowing the request
          if (twoFactorPromise) {
            return twoFactorPromise.then(() => config);
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to refresh token
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.http(
          "Request successful:",
          response.config.url,
          response.status
        );
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // Consolidate error logs in a single elegant message
        logger.error(
          `HTTP Error: ${error.response?.status || "N/A"} ${
            originalRequest.url || ""
          } - ${error.message}`,
          error.response?.data
        );

        const isAuthRoute = originalRequest.url
          ? AUTH_ROUTES.some((route) => originalRequest.url!.includes(route))
          : false;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isAuthRoute
        ) {
          logger.info("401 detected - Starting refresh...");

          if (this.isRefreshing) {
            logger.debug("Refresh already in progress - Adding to queue");
            // If already refreshing, add to queue
            return new Promise<string>((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                logger.debug("Queued request executed");
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;
          logger.info("Starting token refresh...");

          try {
            const tokens = getStoredTokens();
            if (!tokens?.refreshToken) {
              throw new Error("No refresh token available");
            }

            logger.debug("Calling refresh token...");
            const newTokens = await this.refreshToken(tokens.refreshToken);
            logger.info("Refresh token obtained successfully");
            setStoredTokens(newTokens);

            // Process the queue of pending requests
            this.processQueue(null, newTokens.accessToken);

            // Retry the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            }
            logger.debug("Retrying original request...");
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            logger.error("Refresh token error:", refreshError);
            this.processQueue(refreshError, null);
            setStoredTokens(null);
            // Dispatch auth failure event to trigger logout
            dispatchAuthFailure();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle 403 (Permission Denied)
        if (error.response?.status === 403) {
          dispatchPermissionDenied();
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: unknown, token: string | null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token!);
      }
    });

    this.failedQueue = [];
  }

  // HTTP methods for authenticated requests
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data);
    return response.data;
  }

  // HTTP methods for unauthenticated requests
  async publicGet<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, {
      headers: { Authorization: undefined },
    });
    return response.data;
  }

  async publicPost<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, {
      headers: { Authorization: undefined },
    });
    return response.data;
  }

  // Method to refresh token
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const request: RefreshTokenRequest = { refreshToken };
    const response = await this.publicPost<RefreshTokenResponse>(
      "/auth/refresh",
      request
    );
    return response;
  }
}

export const httpService = new HttpService();
