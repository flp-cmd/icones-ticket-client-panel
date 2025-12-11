"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials, AuthUser } from "@/types/auth";
import { isLoginTwoFactorResponse } from "./authUtils";
import {
  setStoredTokens,
  setTwoFactorTimestamp,
  clearAllAuthData,
  clearTwoFactorTimestamp,
} from "@/services/storageService";
import { ErrorService } from "@/services/errorService";
import { authService } from "@/server/authService";

interface UseAuthActionsProps {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthenticatedState: (user: AuthUser) => void;
  setUnauthenticatedState: () => void;
  setTwoFactorState: (twoFactorToken: string) => void;
  resetTwoFactor: () => void;
}

export const useAuthActions = ({
  setLoading,
  setError,
  setAuthenticatedState,
  setUnauthenticatedState,
  setTwoFactorState,
  resetTwoFactor,
}: UseAuthActionsProps) => {
  const router = useRouter();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authService.login(credentials);

        if (isLoginTwoFactorResponse(response)) {
          setTwoFactorState(response.twoFactorToken);
          return;
        }

        clearTwoFactorTimestamp();

        setStoredTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });

        const user = await authService.getCurrentUser();
        setAuthenticatedState(user);

        const intendedPath = sessionStorage.getItem("intendedPath") || "/";
        sessionStorage.removeItem("intendedPath");
        router.push(intendedPath);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage = ErrorService.handleAuthError(error);
        // ErrorService.logError(error, "useAuthActions.login");

        setError(errorMessage);
        setLoading(false);
      }
    },
    [setLoading, setError, setAuthenticatedState, setTwoFactorState, router]
  );

  const verifyTwoFactor = useCallback(
    async (twoFactorCode: string, twoFactorToken?: string) => {
      setLoading(true);
      setError(null);

      try {
        if (!twoFactorToken) {
          setError("Token 2FA não encontrado. Tente fazer login novamente.");
          setLoading(false);
          return;
        }

        const response = await authService.verifyTwoFactor(
          twoFactorToken,
          twoFactorCode
        );

        setStoredTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });

        // Update 2FA timestamp immediately after successful verification
        setTwoFactorTimestamp(Date.now());

        const user = await authService.getCurrentUser();
        setAuthenticatedState(user);

        const intendedPath = sessionStorage.getItem("intendedPath") || "/";
        sessionStorage.removeItem("intendedPath");
        router.push(intendedPath);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage = ErrorService.handleTwoFactorError(error);
        ErrorService.logError(error, "useAuthActions.verifyTwoFactor");

        setError(errorMessage);
        setLoading(false);
      }
    },
    [setLoading, setError, setAuthenticatedState, router]
  );

  const refreshTokens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.refreshTokens();

      setStoredTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      const user = await authService.getCurrentUser();
      setAuthenticatedState(user);
      setLoading(false);
    } catch (error: unknown) {
      const errorMessage = ErrorService.handleAuthError(error);
      ErrorService.logError(error, "useAuthActions.refreshTokens");

      setError(errorMessage);
      setLoading(false);
    }
  }, [setLoading, setError, setAuthenticatedState]);

  const logout = useCallback(() => {
    clearAllAuthData();
    setUnauthenticatedState();
    router.push("/login");
  }, [setUnauthenticatedState, router]);

  const retryAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await authService.getCurrentUser();
      setAuthenticatedState(user);
    } catch (error: unknown) {
      const currentPath = window.location.pathname;
      sessionStorage.setItem("intendedPath", currentPath);
      router.push("/login");
    }
  }, [setLoading, setError, setAuthenticatedState, router]);

  return {
    login,
    verifyTwoFactor,
    resetTwoFactor,
    logout,
    retryAuth,
    refreshTokens,
  };
};
