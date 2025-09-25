"use client";
import { useEffect, useRef } from "react";
import { useController, Control, FieldError } from "react-hook-form";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";
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
  rules?: object;
  disabled?: boolean;
};

export default function DatePicker({
  name,
  control,
  id,
  mode,
  defaultDate,
  label,
  placeholder,
  rules,
  disabled = false,
}: PropsType) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      locale: Thai,
      dateFormat: "d F Y",
      defaultDate: value || defaultDate,
      onChange: (selectedDates, dateStr) => {
        if (dateStr) {
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

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/30`;

  if (disabled) {
    inputClasses += ` bg-gray-100 opacity-50 text-gray-800 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` bg-transparent text-gray-800 border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-red-500`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

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
          disabled={disabled}
          className={inputClasses}
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}