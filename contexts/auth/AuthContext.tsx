'use client';

import { isPublicRoute } from '@/config/routes';
import { AuthContextType } from '@/types/auth';
import { handleAuthError } from './authUtils';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { getStoredTokens } from '@/services/storageService';
import { authService } from '@/services/api/authService';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { ErrorService } from '@/services/errorService';
import { listenToAuthFailure } from '@/services/api/httpService';
import { logger } from '@/services/loggerService';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    state,
    setLoading,
    setError,
    clearError,
    setAuthenticatedState,
    setUnauthenticatedState,
    setRedirectingState,
    setTwoFactorState,
    resetTwoFactor,
    setInitializationComplete,
  } = useAuthState();

  const { login, verifyTwoFactor, logout, retryAuth, refreshTokens } = useAuthActions({
    setLoading,
    setError,
    setAuthenticatedState,
    setUnauthenticatedState,
    setTwoFactorState,
    resetTwoFactor,
  });

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    const tokens = getStoredTokens();

    if (!tokens?.accessToken) {
      return true;
    }

    try {
      const user = await authService.getCurrentUser();
      setAuthenticatedState(user);
      return false;
    } catch (error: unknown) {
      const shouldRedirect = handleAuthError(error);
      if (!shouldRedirect) {
        const errorMessage = ErrorService.handleAuthError(error);
        setError(errorMessage);
      }
      return shouldRedirect;
    }
  }, [setAuthenticatedState, setError]);

  useEffect(() => {
    const initAuth = async () => {
      if (isPublicRoute(pathname)) {
        setUnauthenticatedState();
        setInitializationComplete();
        return;
      }

      const shouldRedirect = await checkAuthStatus();

      if (shouldRedirect && !isPublicRoute(pathname)) {
        setRedirectingState();
        sessionStorage.setItem('intendedPath', pathname);
        router.push('/login');
      } else {
        setLoading(false);
      }

      setInitializationComplete();
    };

    if (state.isInitializing) {
      initAuth();
    }
  }, [
    checkAuthStatus,
    router,
    setInitializationComplete,
    setLoading,
    setRedirectingState,
    setUnauthenticatedState,
    pathname,
    state.isInitializing,
  ]);

  // Listen for auth failure events from httpService
  useEffect(() => {
    const cleanup = listenToAuthFailure(() => {
      logger.info('Auth failure event received - logging out user');

      const currentPath = window.location.pathname;
      if (!isPublicRoute(currentPath)) {
        sessionStorage.setItem('intendedPath', currentPath);
      }

      logout();
    });

    return cleanup;
  }, [logout]);

  const resetAuth = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const contextValue = useMemo(
    (): AuthContextType => ({
      ...state,
      login,
      verifyTwoFactor,
      resetTwoFactor,
      logout,
      clearError,
      retryAuth,
      refreshTokens,
      resetAuth,
    }),
    [state, login, verifyTwoFactor, resetTwoFactor, logout, clearError, retryAuth, refreshTokens, resetAuth]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext };
