import { LoginResponse, JwtPayload } from '@/types/auth';
import { setStoredTokens } from '@/services/storageService';
import { ErrorService, HttpError } from '@/services/errorService';

export const isLoginSuccessResponse = (
  response: LoginResponse
): response is LoginResponse & { accessToken: string; refreshToken: string } => {
  return !('requiresTwoFactor' in response);
};

export const isLoginTwoFactorResponse = (
  response: LoginResponse
): response is LoginResponse & { requiresTwoFactor: true; twoFactorToken: string } => {
  return 'requiresTwoFactor' in response;
};

export const handleAuthError = (error: unknown): boolean => {
  const httpError = error as HttpError;

  if (httpError?.response?.status === 401) {
    setStoredTokens(null);
    return true;
  }

  ErrorService.logError(error, 'authUtils.handleAuthError');

  return false;
};

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as JwtPayload;
  } catch {
    return null;
  }
};
