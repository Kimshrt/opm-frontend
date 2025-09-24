import React, { FC, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  className?: string;
  register?: UseFormRegisterReturn; // ✅ รองรับ react-hook-form
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  multiple?: boolean;
}

const FileInput: FC<FileInputProps> = ({
  className = "",
  register,
  error,
  errorMessage,
  hint,
  multiple = true,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        multiple={multiple}
        className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors 
        file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 
        placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 
        dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400
        ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}
        ${className}`}
        {...register}
        onChange={(e) => {
          handleChange(e);
          register?.onChange?.(e); // ✅ sync กับ react-hook-form
        }}
      />

      {/* รายชื่อไฟล์ */}
      {files.length > 0 && (
        <ul className="list-disc pl-5 text-sm space-y-1">
          {files.map((file, idx) => (
            <li key={idx} className="text-blue-600 hover:underline">
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Error / Hint */}
      {error && errorMessage && (
        <p className="text-red-500 text-xs">{errorMessage}</p>
      )}
      {!error && hint && (
        <p className="text-gray-500 text-xs dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
};

export default FileInput;
