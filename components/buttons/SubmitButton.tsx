import { Button } from "./Button";
import { IconType } from "react-icons";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
  icon?: IconType;
  disabled?: boolean;
  className?: string;
}

export default function SubmitButton({
  isLoading,
  loadingText,
  defaultText,
  icon: Icon,
  disabled = false,
  className = "",
}: SubmitButtonProps) {
  const getIcon = () => {
    if (isLoading) {
      return (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      );
    }

    if (Icon) {
      return <Icon className="mr-2 h-4 w-4" />;
    }

    return null;
  };

  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className={`group relative flex w-full justify-center rounded-lg border border-transparent bg-[#4b6087] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a2538] focus:ring-2 focus:ring-[#4b6087] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
    >
      <div className="flex items-center">
        {getIcon()}
        {isLoading ? loadingText : defaultText}
      </div>
    </Button>
  );
}
