import { AuthTokens } from '@/types/auth';

const TOKEN_KEY = 'auth_tokens';
const TWO_FACTOR_TIMESTAMP_KEY = 'two_factor_timestamp';

export class StorageService {
  static getStoredTokens(): AuthTokens | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static setStoredTokens(tokens: AuthTokens | null): void {
    if (typeof window === 'undefined') return;

    if (tokens) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  static clearStoredTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  }

  static getTwoFactorTimestamp(): number | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(TWO_FACTOR_TIMESTAMP_KEY);
      return stored ? parseInt(stored, 10) : null;
    } catch {
      return null;
    }
  }

  static setTwoFactorTimestamp(timestamp: number): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TWO_FACTOR_TIMESTAMP_KEY, timestamp.toString());
  }

  static clearTwoFactorTimestamp(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TWO_FACTOR_TIMESTAMP_KEY);
  }

  static clearAllAuthData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TWO_FACTOR_TIMESTAMP_KEY);
  }
}

export const getStoredTokens = StorageService.getStoredTokens;
export const setStoredTokens = StorageService.setStoredTokens;
export const clearStoredTokens = StorageService.clearStoredTokens;

export const getTwoFactorTimestamp = StorageService.getTwoFactorTimestamp;
export const setTwoFactorTimestamp = StorageService.setTwoFactorTimestamp;
export const clearTwoFactorTimestamp = StorageService.clearTwoFactorTimestamp;

export const clearAllAuthData = StorageService.clearAllAuthData;
