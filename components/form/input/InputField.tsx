import React, { forwardRef, useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  register?: UseFormRegisterReturn;
  decimalPlaces?: number; // จำนวนทศนิยมที่ต้องการแสดง
  formatOnBlur?: boolean; // เปิด/ปิด format เมื่อ blur
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      placeholder,
      defaultValue,
      onChange,
      value,
      className = "",
      min,
      max,
      step,
      disabled = false,
      success = false,
      error = false,
      errorMessage,
      hint,
      register,
      decimalPlaces = 2,
      formatOnBlur = true,
      ...rest
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 ${className}`;

    if (disabled) {
      inputClasses += ` bg-gray-100 opacity-50 text-gray-800 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
      inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
    } else if (success) {
      inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
    } else {
      inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    // ✅ ฟังก์ชัน format ตัวเลขพร้อม comma separator แบบไทย
    const formatNumber = (val: string | number) => {
      if (!val || val === "" || val === 0) return "";
      const num = typeof val === 'string' ? parseFloat(val) : val;
      if (isNaN(num)) return String(val);

      return num.toLocaleString('th-TH', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      });
    };

    // ✅ ฟังก์ชันลบ comma ออกจากตัวเลข
    const removeCommas = (val: string) => {
      return val.replace(/,/g, '');
    };

    // ✅ ฟังก์ชันตรวจสอบว่าควร format หรือไม่
    const shouldFormat = (val: string | number) => {
      if (!val || val === "" || val === "0") return false;
      const num = typeof val === 'string' ? parseFloat(removeCommas(val)) : val;
      return !isNaN(num) && num > 0;
    };

    // ✅ จัดการค่า initial value - format ทันทีถ้าเป็น number type
    useEffect(() => {
      let initialValue = "";

      if (value !== undefined) {
        initialValue = String(value);
      } else if (defaultValue !== undefined) {
        initialValue = String(defaultValue);
      }

      if (type === "number" && formatOnBlur) {
        if (shouldFormat(initialValue)) {
          setDisplayValue(formatNumber(initialValue));
        } else {
          setDisplayValue("");
        }
      } else {
        setDisplayValue(initialValue);
      }
    }, [value, defaultValue, type, formatOnBlur, decimalPlaces]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (type === "number") {
        // ลบ comma ออกก่อนส่งค่าไปยัง form
        const rawValue = removeCommas(inputValue);
        const modifiedEvent = {
          ...e,
          target: { ...e.target, value: rawValue }
        };

        setDisplayValue(inputValue);
        onChange?.(modifiedEvent);
        register?.onChange?.(modifiedEvent);
      } else {
        setDisplayValue(inputValue);
        onChange?.(e);
        register?.onChange?.(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (type === "number" && formatOnBlur) {
        // แสดงค่าดิบตอน focus (ลบ comma)
        const rawValue = removeCommas(e.target.value);
        setDisplayValue(rawValue);
        e.target.value = rawValue;
      }
      rest.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      if (type === "number" && formatOnBlur) {
        const rawValue = removeCommas(e.target.value);

        // Format เฉพาะเมื่อมีค่าและมากกว่า 0
        if (shouldFormat(rawValue)) {
          const formatted = formatNumber(rawValue);
          setDisplayValue(formatted);

          // trigger onChange ให้ react-hook-form รับค่าดิบ (ไม่มี comma)
          const modifiedEvent = {
            ...e,
            target: { ...e.target, value: rawValue }
          };

          onChange?.(modifiedEvent as React.ChangeEvent<HTMLInputElement>);
        } else if (rawValue === "" || parseFloat(rawValue) === 0) {
          // ถ้าเป็นค่าว่างหรือ 0 ให้เคลียร์
          setDisplayValue("");
        }

        register?.onBlur?.(e);
      } else {
        register?.onBlur?.(e);
      }
      rest.onBlur?.(e);
    };

    return (
      <div className={`relative ${className}`}>
        <input
          type={type === "number" ? "text" : type} // ใช้ text แทน number เพื่อให้ format ได้
          id={id}
          name={register?.name || name}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={type === "number" ? step || "0.01" : step}
          disabled={disabled}
          className={inputClasses}
          ref={(node) => {
            register?.ref(node);
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          {...rest}
        />

        {errorMessage ? (
          <p className="mt-1.5 text-xs text-error-500">{errorMessage}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;