import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  register?: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  register,
  disabled = false,
  error = false,
  errorMessage,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`relative flex items-center gap-3 text-sm font-medium
    ${
      disabled
        ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
        : "cursor-pointer"
    }
    ${error ? "text-error-600" : "text-gray-700 dark:text-gray-400"}
  `}
        >
          <input
            type="radio"
            value={option.value}
            disabled={disabled}
            className="peer sr-only"
            {...register}
          />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] 
      ${
        disabled
          ? "bg-gray-100 opacity-50 text-gray-800 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          : "border-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-600"
      }
    `}
          >
            <span className="h-2 w-2 rounded-full bg-white hidden peer-checked:block"></span>
          </span>
          {option.label}
        </label>
      ))}
      {errorMessage && (
        <p className="mt-1 text-xs text-error-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default RadioGroup;
