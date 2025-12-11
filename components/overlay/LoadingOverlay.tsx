"use client";

import LoadingContent from "./LoadingContent";
import OverlayLayout from "./OverlayLayout";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <OverlayLayout>
      <LoadingContent />
    </OverlayLayout>
  );
}
