import { Check } from "lucide-react";

interface StatusMessageProps {
  message: string;
  className?: string;
  type?: "success" | "error" | "warning" | "info";
}

/**
 * Maps the `type` prop to a Tailwind colour name.
 */
const typeToColor = (type: StatusMessageProps["type"]): string => {
  switch (type) {
    case "error":
      return "red";
    case "warning":
      return "yellow";
    case "info":
      return "blue";
    case "success":
    default:
      return "green";
  }
};

export default function StatusMessage({
  message,
  className = "",
  type = "success",
}: StatusMessageProps) {
  const color = typeToColor(type);

  return (
    <div
      className={`
        rounded-lg border border-${color}-200
        bg-${color}-50 p-4 ${className}
      `}
    >
      <div className="flex items-center">
        <Check
          className={`
            mr-2 h-5 w-5 text-${color}-400
          `}
        />
        <span
          className={`
            text-sm text-${color}-700
          `}
        >
          {message}
        </span>
      </div>
    </div>
  );
}
