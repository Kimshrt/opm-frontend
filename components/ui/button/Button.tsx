import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // เนื้อหาในปุ่ม
  size?: "sm" | "md"; // ขนาด
  variant?: "primary" | "outline"; // สไตล์
  startIcon?: ReactNode; // ไอคอนด้านซ้าย
  endIcon?: ReactNode; // ไอคอนด้านขวา
  onClick?: () => void; // event click
  disabled?: boolean; // ปิดการใช้งาน
  className?: string; // custom class
  type?: "button" | "submit" | "reset"; // ✅ เพิ่มตรงนี้
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button", // ✅ default เป็น "button"
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white  my-4 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white my-4 ring-1 ring-inset border border-[#465fff] text-[#465fff] ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      type={type} // ✅ รองรับ button, submit, reset
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
