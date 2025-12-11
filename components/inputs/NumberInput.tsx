import { Shield } from "lucide-react";

interface NumberFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
  helpText?: string;
}

export default function NumberField({
  value,
  onChange,
  label,
  placeholder = "000000",
  maxLength = 6,
  required = true,
  className = "",
  helpText,
}: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor="numberField"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Shield className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="numberField"
          name="numberField"
          type="text"
          autoComplete="one-time-code"
          required={required}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`block w-full rounded-lg border border-gray-300 py-3 pr-3 pl-10 text-center font-mono text-lg tracking-widest text-gray-900 placeholder-gray-500 transition-colors focus:border-[#4b6087] focus:ring-2 focus:ring-[#4b6087] focus:outline-none ${className}`}
          placeholder={placeholder}
        />
      </div>
      {helpText && <p className="mt-2 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}
