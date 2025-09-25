"use client";

import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  name: string;
  placeholder?: string;
  options: Option[];
  control: any;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  placeholder = "เลือก...",
  options,
  control,
  disabled = false,
  error,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  // 👉 detect click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full" ref={wrapperRef}>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const selectedOptions: string[] = field.value || [];

          const handleSelect = (optionValue: string) => {
            const newSelectedOptions = selectedOptions.includes(optionValue)
              ? selectedOptions.filter((v) => v !== optionValue)
              : [...selectedOptions, optionValue];

            field.onChange(newSelectedOptions);
          };

          const removeOption = (value: string) => {
            const newSelectedOptions = selectedOptions.filter((v) => v !== value);
            field.onChange(newSelectedOptions);
          };

          const selectedLabels = selectedOptions.map(
            (value) => options.find((o) => o.value === value)?.label || ""
          );

          const availableOptions = options.filter(
            (option) => !selectedOptions.includes(option.value)
          );

          return (
            <div>
              <div className="relative z-20 inline-block w-full">
                <div className="relative flex flex-col items-center">
                  <div onClick={toggleDropdown} className="w-full">
                    <div
                      className={`mb-2 flex h-11 rounded-lg border py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition dark:bg-gray-900 ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-brand-300"
                      }`}
                    >
                      <div className="flex flex-wrap flex-auto gap-2">
                        {selectedLabels.length > 0 ? (
                          selectedLabels.map((text, index) => (
                            <div
                              key={index}
                              className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
                            >
                              <span className="flex-initial max-w-full">
                                {text}
                              </span>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeOption(selectedOptions[index]);
                                }}
                                className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
                              >
                                ✕
                              </div>
                            </div>
                          ))
                        ) : (
                          <input
                            placeholder={placeholder}
                            className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-hidden appearance-none placeholder:text-gray-400 focus:border-0 focus:outline-hidden focus:ring-0 dark:placeholder:text-white/90"
                            readOnly
                          />
                        )}
                      </div>
                      <div className="flex items-center py-1 pl-1 pr-1 w-7">
                        <button
                          type="button"
                          onClick={toggleDropdown}
                          className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400"
                        >
                          <svg
                            className={`stroke-current ${isOpen ? "rotate-180" : ""}`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-lg border border-gray-300 shadow-sm top-full max-h-60 dark:bg-gray-900">
                      <div className="flex flex-col">
                        {availableOptions.length > 0 ? (
                          availableOptions.map((option, index) => (
                            <div
                              key={index}
                              className="hover:bg-primary/5 w-full cursor-pointer border-b border-gray-200 dark:border-gray-800"
                              onClick={() => handleSelect(option.value)}
                            >
                              <div className="relative flex w-full items-center p-2 pl-2">
                                <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                                  {option.label}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
                             ไม่มีในตัวเลือกที่สามารถเลือกได้
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {error && errorMessage && (
                <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MultiSelect;
