import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  type?: "text" | "password" | "email";
  clearable?: boolean;
  passwordToggle?: boolean;
  color?: "blue" | "green" | "red" | "purple";
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  loading = false,
  type = "text",
  clearable = false,
  passwordToggle = false,
  color = "blue",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Color map
  const colorMap: Record<string, string> = {
    blue: "focus:ring-blue-500 focus:border-blue-500",
    green: "focus:ring-green-500 focus:border-green-500",
    red: "focus:ring-red-500 focus:border-red-500",
    purple: "focus:ring-purple-500 focus:border-purple-500",
  };

  const variantClasses = {
    filled: `bg-gray-100 border border-gray-200 ${colorMap[color]}`,
    outlined: `border border-gray-300 ${colorMap[color]}`,
    ghost: `border border-transparent bg-transparent ${colorMap[color]}`,
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <div className="flex flex-col gap-1 w-full animate-fadeIn">
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          type={passwordToggle && !showPassword ? "password" : type}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          className={`
            w-full rounded-xl transition-all duration-300 ease-in-out 
            outline-none shadow-sm pr-10
            focus:scale-[1.02] 
            ${variantClasses[variant]} 
            ${sizeClasses[size]} 
            ${invalid ? "border-red-500 focus:ring-red-400 animate-shake" : ""}
            ${disabled ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""}
          `}
        />

        {/* Clear button */}
        {clearable && value && !loading && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Password toggle */}
        {passwordToggle && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Helper / Error Text */}
      {helperText && !errorMessage && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {errorMessage && (
        <span className="text-xs font-medium text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
