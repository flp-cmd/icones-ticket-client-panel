import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "primary"
    | "secondary"
    | "primaryDark"
    | "outlineDark"
    | "primaryBlue"
    | "outlineBlue"
    | "primaryBlueDark"
    | "filter";
}

export function Button({
  children,
  className = "",
  variant = "default",
  disabled,
  ...props
}: ButtonProps) {
  const base = "px-2 py-2 rounded-lg font-medium text-sm transition-colors";
  const variants = {
    default:
      "bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryLight)] border border-[var(--primaryDark)] transition-all duration-200",
    outline:
      "bg-white text-[var(--primaryDark)] border border-[var(--primaryDark)] hover:bg-[var(--primaryDark)] hover:text-white transition-all duration-200",
    primary:
      "bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryLight)] border border-transparent focus:ring-2 focus:ring-[var(--primaryDark)] focus:ring-offset-2 focus:outline-none transition-all duration-200",
    secondary:
      "bg-white text-[var(--primaryDark)] border border-[var(--primaryDark)] hover:bg-[var(--primaryDark)] hover:text-white transition-all duration-200",
    primaryDark:
      "bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryLight)] border border-[var(--primaryDark)] transition-all duration-200",
    outlineDark:
      "bg-white text-[var(--primaryDark)] border border-[var(--primaryDark)] hover:bg-[var(--primaryDark)] hover:text-white transition-all duration-200",
    primaryBlue:
      "bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryLight)] border border-[var(--primaryDark)] transition-all duration-200",
    primaryBlueDark:
      "bg-[var(--primaryDark)] text-white hover:bg-[var(--primaryLight)] border border-[var(--primaryDark)] transition-all duration-200",
    outlineBlue:
      "bg-white text-[var(--primaryDark)] border border-[var(--primaryDark)] hover:bg-[var(--primaryDark)] hover:text-white transition-all duration-200",
    filter:
      "bg-white text-[var(--textDark)] border border-gray-200 hover:bg-gray-50 hover:text-[var(--primaryDark)] hover:border-[var(--primaryDark)] shadow-sm transition-all duration-200",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  return (
    <button
      className={`${base} ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
