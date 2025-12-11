'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ErrorService } from '@/services/errorService';
import { listenToPermissionDenied } from '@/server/httpService';

export interface AppError {
  message: string;
  type: 'permission-denied' | 'auth-error' | 'server-error' | 'network-error' | 'unknown';
  actions?: ('retry' | 'back' | 'home' | 'login')[];
  title?: string;
  icon?: 'lock' | 'warning' | 'error' | 'info';
}

interface AppContextType {
  pageTitle: string | null;
  setPageTitle: (title: string | null) => void;
  appError: AppError | null;
  setAppError: (error: AppError | null) => void;
  clearAppError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [appError, setAppError] = useState<AppError | null>(null);

  const clearAppError = () => setAppError(null);

  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle}`;
    }
  }, [pageTitle]);

  useEffect(() => {
    const cleanup = listenToPermissionDenied(() => {
      const errorMessage = ErrorService.handleHttpError({ response: { status: 403 } }).message;
      setAppError({
        message: errorMessage,
        type: 'permission-denied',
        actions: ['home'],
        title: 'Acesso Negado',
        icon: 'lock',
      });
    });

    return cleanup;
  }, []);

  return (
    <AppContext.Provider value={{ pageTitle, setPageTitle, appError, setAppError, clearAppError }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
