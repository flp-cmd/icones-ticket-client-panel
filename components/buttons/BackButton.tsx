"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
  href?: string;
  text?: string;
  className?: string;
  fullWidth?: boolean;
}

export function BackButton({
  onClick,
  href,
  text = "Voltar",
  className = "",
  fullWidth = false,
}: BackButtonProps) {
  const baseClasses = fullWidth
    ? "w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none"
    : "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        <ArrowLeft className="h-4 w-4" />
        {text}
      </Link>
    );
  }

  if (fullWidth) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        <div className="flex items-center justify-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {text}
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {text}
    </button>
  );
}
