import "../../style/spinner.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export default function Spinner({
  size = "sm",
  color = "var(--primaryLight)",
  className = "",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className={`spinner-container ${className}`}>
      <div
        className={`spinner ${sizeClasses[size]}`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
}
