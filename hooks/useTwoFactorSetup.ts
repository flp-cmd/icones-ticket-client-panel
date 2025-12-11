"use client";

import { useState } from "react";
import { ErrorService } from "@/services/errorService";
import { logger } from "@/services/loggerService";
import { TwoFactorSetupInitResponse } from "@/types/authTwoFactor";
import { authService } from "@/server/authService";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useErrorHandler } from "./useErrorHandler";

type SetupStep = "qr-code" | "confirm" | "success";

interface UseTwoFactorSetupReturn {
  step: SetupStep;
  setStep: (step: SetupStep) => void;
  setupData: TwoFactorSetupInitResponse | null;
  isLoading: boolean;
  error: string | null;
  isAlreadyConfigured: boolean;
  initSetup: () => Promise<void>;
  confirmSetup: (code: string) => Promise<void>;
  resetSetup: () => void;
  clearError: () => void;
}

export const useTwoFactorSetup = (): UseTwoFactorSetupReturn => {
  const { error, handleError, clearError } = useErrorHandler();
  const { refreshTokens } = useAuth();
  const [step, setStep] = useState<SetupStep>("qr-code");
  const [setupData, setSetupData] = useState<TwoFactorSetupInitResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyConfigured, setIsAlreadyConfigured] = useState(false);

  const initSetup = async () => {
    if (isAlreadyConfigured) {
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const response = await authService.initTwoFactorSetup();
      setSetupData(response);
      setStep("qr-code");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const httpError = err as {
          response?: { data?: { message?: string; error?: string } };
        };
        const message =
          httpError.response?.data?.message || httpError.response?.data?.error;

        if (
          message?.includes("already configured") ||
          message?.includes("Two-factor authentication already configured")
        ) {
          setIsAlreadyConfigured(true);
          handleError(
            new Error(
              "A autenticação de dois fatores já está configurada para sua conta."
            ),
            "TwoFactorSetup.initSetup.alreadyConfigured"
          );
          return;
        }
      }

      const errorMessage = ErrorService.handleTwoFactorError(err);
      ErrorService.logError(err, "TwoFactorSetup.initSetup");
      handleError(new Error(errorMessage), "TwoFactorSetup.initSetup");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSetup = async (code: string) => {
    if (!setupData?.setupToken) {
      handleError(
        new Error("Token de configuração não encontrado. Tente novamente."),
        "TwoFactorSetup.confirmSetup.noToken"
      );
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      await authService.confirmTwoFactorSetup({
        setupToken: setupData.setupToken,
        code,
      });

      setStep("success");

      try {
        await refreshTokens();
      } catch (refreshError) {
        logger.warn("Erro ao fazer refresh dos tokens:", refreshError);
      }
    } catch (err: unknown) {
      const errorMessage = ErrorService.handleTwoFactorError(err);
      ErrorService.logError(err, "TwoFactorSetup.confirmSetup");
      handleError(new Error(errorMessage), "TwoFactorSetup.confirmSetup");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSetup = () => {
    setStep("qr-code");
    setSetupData(null);
    clearError();
    setIsAlreadyConfigured(false);
  };

  return {
    step,
    setStep,
    setupData,
    isLoading,
    error,
    isAlreadyConfigured,
    initSetup,
    confirmSetup,
    resetSetup,
    clearError,
  };
};
