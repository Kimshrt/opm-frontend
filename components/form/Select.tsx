import React, { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  register?: UseFormRegisterReturn;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = "เลือก...",
      className = "",
      error = false,
      errorMessage,
      hint,
      register,
      ...rest
    },
    ref
  ) => {
    let selectClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-10 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 ${className}`;

    if (error) {
      selectClasses += ` text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
    } else {
      selectClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return (
      <div className="relative">
        <select
          ref={ref}
          className={selectClasses}
          {...register}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* ✅ ลูกศร custom */}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <FiChevronDown className="w-4 h-4" />
        </span>

        {errorMessage ? (
          <p className="mt-1.5 text-xs text-error-500">{errorMessage}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
