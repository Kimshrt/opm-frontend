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
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  register,
  error = false,
  errorMessage,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`relative flex cursor-pointer items-center gap-3 text-sm font-medium ${
            error ? "text-error-600" : "text-gray-700 dark:text-gray-400"
          }`}
        >
          {/* 👇 ใช้ peer เพื่อตรวจว่า checked */}
          <input
            type="radio"
            value={option.value}
            className="peer sr-only"
            {...register}
          />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] 
              border-gray-300 dark:border-gray-700
              peer-checked:border-blue-600 peer-checked:bg-blue-600
            `}
          >
            <span
              className={`h-2 w-2 rounded-full bg-white hidden peer-checked:block`}
            ></span>
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
