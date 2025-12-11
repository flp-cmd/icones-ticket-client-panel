import { useState, useCallback } from 'react';
import { ErrorService } from '@/services/errorService';

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown, context?: string) => {
    const errorMessage = ErrorService.handleAuthError(error);
    ErrorService.logError(error, context);
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};
