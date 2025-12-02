'use client';

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export interface TableData<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface TableFilters {
  [key: string]: string | number | boolean | undefined;
}

export interface TableContextData<T, F extends TableFilters> {
  data: TableData<T> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  filters: F;
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
  refetch: () => void;
  updateFilters: (newFilters: Partial<F>) => void;
  updateFiltersWithoutReset: (newFilters: Partial<F>) => void;
  updatePagination: (page: number, perPage?: number) => void;
  clearFilters: () => void;
}

export function createTableContext<T, F extends TableFilters>() {
  const TableContext = createContext<TableContextData<T, F> | undefined>(undefined);

  return {
    TableContext,
    useTableContext: () => {
      const context = useContext(TableContext);
      if (!context) {
        throw new Error('useTableContext must be used within a TableProvider');
      }
      return context;
    },
  };
}

export interface TableProviderProps<T, F extends TableFilters> {
  children: ReactNode;
  context: React.Context<TableContextData<T, F> | undefined>;
  queryKey: string[];
  queryFn: (params: F & { page: number; perPage: number }) => Promise<TableData<T>>;
  initialFilters: F;
  initialPage?: number;
  initialPerPage?: number;
  urlParamPrefix?: string;
}

export function TableProvider<T, F extends TableFilters>({
  children,
  context,
  queryKey,
  queryFn,
  initialFilters,
  initialPage = 1,
  initialPerPage = 20,
  urlParamPrefix = '',
}: TableProviderProps<T, F>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getInitialPage = () => {
    const pageParam = searchParams.get(`${urlParamPrefix}pagina`);
    const page = pageParam ? parseInt(pageParam) : initialPage;
    return Math.max(1, Math.min(page, Number.MAX_SAFE_INTEGER));
  };

  const getInitialPerPage = () => {
    const perPageParam = searchParams.get(`${urlParamPrefix}porPagina`);
    const perPage = perPageParam ? parseInt(perPageParam) : initialPerPage;
    return Math.max(1, Math.min(perPage, 1000));
  };

  const getInitialFilters = (): F => {
    const filters = { ...initialFilters };
    Object.keys(filters).forEach((key) => {
      const paramValue = searchParams.get(`${urlParamPrefix}${key}`);
      if (paramValue !== null) {
        (filters as Record<string, string | number | boolean | undefined>)[key] = paramValue;
      }
    });
    return filters;
  };

  const [page, setPage] = useState(getInitialPage);
  const [perPage, setPerPage] = useState(getInitialPerPage);
  const [filters, setFilters] = useState<F>(getInitialFilters);

  const updateUrlParams = useCallback(
    (newPage: number, newPerPage: number, newFilters: F, usePush = false) => {
      const params = new URLSearchParams(searchParams);

      params.set(`${urlParamPrefix}pagina`, newPage.toString());
      params.set(`${urlParamPrefix}porPagina`, newPerPage.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(`${urlParamPrefix}${key}`, String(value));
        } else {
          params.delete(`${urlParamPrefix}${key}`);
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;
      if (usePush) {
        router.push(newUrl, { scroll: false });
      } else {
        router.replace(newUrl, { scroll: false });
      }
    },
    [searchParams, pathname, router, urlParamPrefix]
  );

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: [...queryKey, page, perPage, filters],
    queryFn: () => queryFn({ ...filters, page, perPage }),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000, // 1 minutes
    placeholderData: (previousData) => previousData,
  });

  const updateFilters = useCallback(
    (newFilters: Partial<F>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      setPage(1);
      updateUrlParams(1, perPage, updatedFilters);
    },
    [filters, perPage, updateUrlParams]
  );

  const updateFiltersWithoutReset = useCallback(
    (newFilters: Partial<F>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      updateUrlParams(page, perPage, updatedFilters);
    },
    [filters, page, perPage, updateUrlParams]
  );

  const updatePagination = useCallback(
    (newPage: number, newPerPage?: number) => {
      const validPage = Math.max(1, Math.min(newPage, Number.MAX_SAFE_INTEGER));
      const updatedPerPage = newPerPage ? Math.max(1, Math.min(newPerPage, 1000)) : perPage;

      setPage(validPage);
      setPerPage(updatedPerPage);
      updateUrlParams(validPage, updatedPerPage, filters, true);
    },
    [perPage, filters, updateUrlParams]
  );

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setPage(1);
    updateUrlParams(1, perPage, initialFilters);
  }, [initialFilters, perPage, updateUrlParams]);

  useEffect(() => {
    const pageParam = searchParams.get(`${urlParamPrefix}pagina`);
    const urlPage = pageParam ? parseInt(pageParam) : initialPage;
    const validUrlPage = Math.max(1, Math.min(urlPage, Number.MAX_SAFE_INTEGER));

    const perPageParam = searchParams.get(`${urlParamPrefix}porPagina`);
    const urlPerPage = perPageParam ? parseInt(perPageParam) : initialPerPage;
    const validUrlPerPage = Math.max(1, Math.min(urlPerPage, 1000));

    const urlFilters: F = { ...initialFilters };
    Object.keys(initialFilters).forEach((key) => {
      const paramValue = searchParams.get(`${urlParamPrefix}${key}`);
      if (paramValue !== null) {
        (urlFilters as Record<string, string | number | boolean | undefined>)[key] = paramValue;
      }
    });

    if (validUrlPage !== page) {
      setPage(validUrlPage);
    }
    if (validUrlPerPage !== perPage) {
      setPerPage(validUrlPerPage);
    }

    const filtersChanged = Object.keys({ ...initialFilters, ...urlFilters }).some(
      (key) => urlFilters[key] !== filters[key]
    );
    if (filtersChanged) {
      setFilters(urlFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, urlParamPrefix]);

  const contextValue: TableContextData<T, F> = {
    data,
    isLoading,
    isFetching,
    error,
    filters,
    pagination: {
      page,
      perPage,
      total: data?.total || 0,
    },
    refetch,
    updateFilters,
    updateFiltersWithoutReset,
    updatePagination,
    clearFilters,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}
