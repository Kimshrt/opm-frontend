import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  error?: boolean; // ✅ ถ้ามี error จะเปลี่ยนสี
}

const Label: FC<LabelProps> = ({
  htmlFor,
  children,
  className,
  required,
  error,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        "mb-1.5 block text-lg font-medium",
        error ? "text-red-500" : "text-gray-700 dark:text-gray-400",
        className
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
