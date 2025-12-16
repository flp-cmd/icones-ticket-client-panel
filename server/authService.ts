import {
  AuthTokens,
  AuthUser,
  LoginCredentials,
  LoginResponse,
  TwoFactorResponse,
} from "@/types/auth";
import { httpService } from "./httpService";
import { getStoredTokens } from "@/services/storageService";
import {
  TwoFactorSetupInitResponse,
  TwoFactorSetupConfirmRequest,
  TwoFactorSetupConfirmResponse,
  TwoFactorDisableResponse,
} from "@/types/authTwoFactor";

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return httpService.publicPost<LoginResponse>("/auth/login", credentials);
  }

  async verifyTwoFactor(
    twoFactorToken: string,
    twoFactorCode: string
  ): Promise<TwoFactorResponse> {
    return httpService.publicPost<TwoFactorResponse>("/auth/2fa/verify", {
      twoFactorToken,
      code: twoFactorCode,
    });
  }

  async verifyTwoFactorTime(
    twoFactorCode: string
  ): Promise<{ success: boolean }> {
    return httpService.post<{ success: boolean }>("/auth/2fa/verify-code", {
      code: twoFactorCode,
    });
  }

  async getCurrentUser(): Promise<AuthUser> {
    return httpService.get<AuthUser>("/auth/user");
  }

  async refreshTokens(): Promise<AuthTokens> {
    const tokens = getStoredTokens();
    if (!tokens?.refreshToken) {
      throw new Error("No refresh token available");
    }
    return httpService.refreshToken(tokens.refreshToken);
  }

  async initTwoFactorSetup(): Promise<TwoFactorSetupInitResponse> {
    return httpService.post<TwoFactorSetupInitResponse>("/auth/2fa/setup/init");
  }

  async confirmTwoFactorSetup(
    request: TwoFactorSetupConfirmRequest
  ): Promise<TwoFactorSetupConfirmResponse> {
    return httpService.post<TwoFactorSetupConfirmResponse>(
      "/auth/2fa/setup/confirm",
      request
    );
  }

  async disableTwoFactor(): Promise<TwoFactorDisableResponse> {
    return httpService.post<TwoFactorDisableResponse>("/auth/2fa/disable");
  }

  async updatePassword(password: string): Promise<void> {
    return httpService.post<void>("/auth/user/password", { password });
  }
}

export const authService = new AuthService();
