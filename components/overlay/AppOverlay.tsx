"use client";

import { useIsPublicRoute } from "@/hooks/useIsPublicRoute";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/auth/AuthContext";
import ErrorOverlay from "./ErrorOverlay";
import LoadingOverlay from "./LoadingOverlay";

export default function AppOverlay() {
  const { appError } = useApp();
  const { isLoading, error: authError } = useAuth();
  const isPublicRoute = useIsPublicRoute();

  if (isPublicRoute) {
    return null;
  }

  if (appError) {
    return <ErrorOverlay appError={appError} />;
  }

  if (authError) {
    return (
      <ErrorOverlay appError={{ message: authError, type: "auth-error" }} />
    );
  }

  return <LoadingOverlay isLoading={isLoading} />;
}
