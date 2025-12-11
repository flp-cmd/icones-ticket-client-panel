"use client";

import { useAuth } from "@/contexts/auth/AuthContext";
import { AppError, useApp } from "@/contexts/AppContext";
import { Button } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";

interface ErrorContentProps {
  appError: AppError;
}

export default function ErrorContent({ appError }: ErrorContentProps) {
  const { logout } = useAuth();
  const { clearAppError } = useApp();
  const router = useRouter();

  const handleRetry = async () => {
    clearAppError();
    window.location.reload();
  };

  const handleBack = () => {
    clearAppError();
    window.history.back();
  };

  const handleLogout = () => {
    clearAppError();
    logout();
  };

  const handleHome = () => {
    clearAppError();
    router.push("/");
  };

  const actions = appError.actions || ["retry", "login"];

  const title = appError.title || "Ops! Algo deu errado";
  const icon = appError.icon || "error";

  const renderIcon = () => {
    switch (icon) {
      case "lock":
        return (
          <svg
            className="h-8 w-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="h-8 w-8 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="h-8 w-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
    }
  };

  const renderActionButtons = () => {
    if (actions.length === 0) return null;

    const buttons = actions.map((action) => {
      switch (action) {
        case "retry":
          return (
            <Button
              key="retry"
              onClick={handleRetry}
              variant="primary"
              className="flex-1 py-3"
            >
              Tentar Novamente
            </Button>
          );
        case "back":
          return (
            <Button
              key="back"
              onClick={handleBack}
              variant="primary"
              className="flex-1 py-3"
            >
              Voltar
            </Button>
          );
        case "login":
          return (
            <Button
              key="login"
              onClick={handleLogout}
              variant="outline"
              className="flex-1 py-3"
            >
              Ir para Login
            </Button>
          );
        case "home":
          return (
            <Button
              key="home"
              onClick={handleHome}
              variant="primary"
              className="flex-1 py-3"
            >
              Ir para Home
            </Button>
          );
        default:
          return null;
      }
    });

    return (
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
        {buttons}
      </div>
    );
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-50">
            {renderIcon()}
          </div>
        </div>

        <div className="mb-8 text-center">
          <h3 className="mb-3 text-xl font-semibold text-[#344767]">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            <span className="font-medium">{appError.message}</span>
          </p>
          <p className="text-xs text-gray-500">
            Se o problema persistir, entre em contato com o time de
            desenvolvimento.
          </p>
        </div>

        {renderActionButtons()}
      </div>
    </div>
  );
}
