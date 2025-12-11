"use client";

import OverlayLayout from "./OverlayLayout";
import ErrorContent from "./ErrorContent";
import { AppError } from "@/contexts/AppContext";

interface ErrorOverlayProps {
  appError: AppError;
}

export default function ErrorOverlay({ appError }: ErrorOverlayProps) {
  return (
    <OverlayLayout>
      <ErrorContent appError={appError} />
    </OverlayLayout>
  );
}
