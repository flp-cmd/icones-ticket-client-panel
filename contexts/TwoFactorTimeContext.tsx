'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface TwoFactorTimeContextType {
  isModalOpen: boolean;
  pendingRequest: (() => void) | null;
  showTwoFactorModal: (onSuccess: () => void) => void;
  hideTwoFactorModal: () => void;
  onTwoFactorSuccess: () => void;
}

const TwoFactorTimeContext = createContext<TwoFactorTimeContextType | undefined>(undefined);

interface TwoFactorTimeProviderProps {
  children: ReactNode;
}

export function TwoFactorTimeProvider({ children }: TwoFactorTimeProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<(() => void) | null>(null);

  const showTwoFactorModal = useCallback((onSuccess: () => void) => {
    setPendingRequest(() => onSuccess);
    setIsModalOpen(true);
  }, []);

  const hideTwoFactorModal = useCallback(() => {
    setIsModalOpen(false);
    setPendingRequest(null);
  }, []);

  const onTwoFactorSuccess = useCallback(() => {
    if (pendingRequest) {
      pendingRequest();
    }
    hideTwoFactorModal();
  }, [pendingRequest, hideTwoFactorModal]);

  const value: TwoFactorTimeContextType = {
    isModalOpen,
    pendingRequest,
    showTwoFactorModal,
    hideTwoFactorModal,
    onTwoFactorSuccess,
  };

  return <TwoFactorTimeContext.Provider value={value}>{children}</TwoFactorTimeContext.Provider>;
}

export function useTwoFactorTimeContext() {
  const context = useContext(TwoFactorTimeContext);
  if (context === undefined) {
    throw new Error('useTwoFactorTimeContext must be used within a TwoFactorTimeProvider');
  }
  return context;
}
