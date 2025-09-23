"use client";
import { useEffect, useRef } from "react";
import { useController, Control } from "react-hook-form";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js"; // ⭐ import locale ไทย
import Label from "./Label";
import { CalenderIcon } from "../../icons";

type PropsType = {
  name: string;
  control: Control<any>;
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  defaultDate?: flatpickr.Options.DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  name,
  control,
  id,
  mode,
  defaultDate,
  label,
  placeholder,
}: PropsType) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      locale: Thai, // ✅ ใช้ locale ไทย
      dateFormat: "d F Y", // ✅ แสดงวันที่เป็นภาษาไทย
      defaultDate: value || defaultDate,
      onChange: (selectedDates, dateStr) => {
        if (dateStr) {
          // แปลงปี ค.ศ. → พ.ศ.
          const parts = dateStr.split(" ");
          if (parts.length === 3) {
            const year = parseInt(parts[2], 10) + 543;
            dateStr = `${parts[0]} ${parts[1]} ${year}`;
          }
        }
        onChange(dateStr);
      },
    });

    return () => {
      if (fp) fp.destroy();
    };
  }, [mode, onChange, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          ref={(el) => {
            inputRef.current = el;
            if (ref) {
              if (typeof ref === "function") ref(el);
              else
                (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                  el;
            }
          }}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs 
                     placeholder:text-gray-400 focus:outline-hidden focus:ring-3  
                     dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  
                     bg-transparent text-gray-800 
                     ${
                       error
                         ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                         : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"
                     } 
                     dark:border-gray-700 dark:focus:border-brand-800`}
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
