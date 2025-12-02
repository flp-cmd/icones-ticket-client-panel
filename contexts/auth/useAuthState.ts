'use client';

import { useState, useCallback } from 'react';
import { AuthState, AuthUser } from '@/types/auth';
import { decodeJwtPayload } from './authUtils';
import { getStoredTokens } from '@/services/storageService';

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    jwtPayload: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    requiresTwoFactor: false,
    twoFactorToken: null,
    isInitializing: true,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading, isInitializing: false }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const setAuthenticatedState = useCallback((user: AuthUser) => {
    const tokens = getStoredTokens();
    const jwtPayload = tokens?.accessToken ? decodeJwtPayload(tokens.accessToken) : null;
    const requiresTwoFactor = jwtPayload?.requiresTwoFactor || false;

    setState((prev) => ({
      ...prev,
      user,
      jwtPayload,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      requiresTwoFactor,
      twoFactorToken: null,
      isInitializing: false,
    }));
  }, []);

  const setUnauthenticatedState = useCallback(() => {
    setState({
      user: null,
      jwtPayload: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      requiresTwoFactor: false,
      twoFactorToken: null,
      isInitializing: false,
    });
  }, []);

  const setRedirectingState = useCallback(() => {
    setState({
      user: null,
      jwtPayload: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      requiresTwoFactor: false,
      twoFactorToken: null,
      isInitializing: false,
    });
  }, []);

  const setTwoFactorState = useCallback((twoFactorToken: string) => {
    setState((prev) => ({
      ...prev,
      requiresTwoFactor: true,
      twoFactorToken,
      isLoading: false,
      error: null,
    }));
  }, []);

  const resetTwoFactor = useCallback(() => {
    setState((prev) => ({
      ...prev,
      requiresTwoFactor: false,
      twoFactorToken: null,
      error: null,
    }));
  }, []);

  const setInitializationComplete = useCallback(() => {
    setState((prev) => ({ ...prev, isInitializing: false }));
  }, []);

  return {
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
  };
};
