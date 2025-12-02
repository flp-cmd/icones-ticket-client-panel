export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isInitializing: boolean;
  user: AuthUser | null;
  jwtPayload: JwtPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  requiresTwoFactor: boolean;
  twoFactorToken: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: number;
  email: string;
  type: string;
  permissions: string[];
  credential: string;
  requiresTwoFactor: boolean;
  impersonatedBy?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

// Responses

export interface LoginSuccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginTwoFactorResponse {
  requiresTwoFactor: true;
  twoFactorToken: string;
}

export type LoginResponse = LoginSuccessResponse | LoginTwoFactorResponse;

export interface TwoFactorResponse {
  accessToken: string;
  refreshToken: string;
}

// Context interface
export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  verifyTwoFactor: (twoFactorCode: string, twoFactorToken?: string) => Promise<void>;
  resetTwoFactor: () => void;
  logout: () => void;
  clearError: () => void;
  retryAuth: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  resetAuth: () => void;
}
