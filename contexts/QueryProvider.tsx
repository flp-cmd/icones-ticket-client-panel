'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { HttpError } from '@/services/errorService';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const retry = (failureCount: number, error: unknown) => {
    const httpError = error as HttpError;
    const status = httpError?.response?.status;

    if (status && status >= 400 && status < 500 && status !== 408 && status !== 429) {
      return false;
    }

    if (status && status >= 500) {
      return failureCount < 1;
    }

    return failureCount < 3;
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry,
          },
          mutations: {
            retry,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
