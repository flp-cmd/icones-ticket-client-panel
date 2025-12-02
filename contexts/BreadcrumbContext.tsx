'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { BreadcrumbItem } from '@/services/navigationService';

interface BreadcrumbContextType {
  customBreadcrumbItem: BreadcrumbItem | null;
  setCustomBreadcrumbItem: (item: BreadcrumbItem | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [customBreadcrumbItem, setCustomBreadcrumbItem] = useState<BreadcrumbItem | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ customBreadcrumbItem, setCustomBreadcrumbItem }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}
