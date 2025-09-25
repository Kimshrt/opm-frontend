"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useController, Control } from "react-hook-form";

interface DropzoneInputProps {
  name: string;
  control: Control<any>;
  rules?: object;
}

const DropzoneInput: React.FC<DropzoneInputProps> = ({ name, control, rules }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [duplicateMessage, setDuplicateMessage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const existingNames = new Set((value || []).map((f: File) => f.name));
    const newFiles: File[] = [];
    const duplicates: string[] = [];

    for (const file of acceptedFiles) {
      if (existingNames.has(file.name)) {
        duplicates.push(file.name);
      } else {
        existingNames.add(file.name);
        newFiles.push(file);
      }
    }

    if (duplicates.length > 0) {
      setDuplicateMessage(`⚠️ ไฟล์ซ้ำ: ${duplicates.join(", ")}`);
      setTimeout(() => setDuplicateMessage(null), 3000); // ซ่อนข้อความหลัง 3 วิ
    }

    if (newFiles.length > 0) {
      onChange([...(value || []), ...newFiles]);
    }
  };

  const removeFile = (file: File) => {
    onChange(value.filter((f: File) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border border-dashed rounded-xl p-4 min-h-[150px] flex flex-wrap gap-3 cursor-pointer
          ${isDragActive ? "border-blue-500 bg-gray-100" : "border-gray-300 bg-gray-50"}
          ${error ? "border-red-500" : ""}
        `}
      >
        <input {...getInputProps()} />

        {value && value.length > 0 ? (
          value.map((file: File) => (
            <div
              key={file.name}
              className="relative w-24 h-24 border rounded-lg overflow-hidden bg-white"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file);
                }}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-[10px] px-1 truncate">
                {file.name}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-center py-6">
            <div className="mb-3 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-200 text-gray-600">
              📂
            </div>
            <p className="font-medium text-gray-700">
              {isDragActive ? "ปล่อยไฟล์ที่นี่" : "ลาก & วางไฟล์ หรือ คลิกเพื่อเลือก"}
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-xs text-red-500">{error.message}</p>}

      {/* Duplicate message */}
      {duplicateMessage && <p className="text-xs text-yellow-600">{duplicateMessage}</p>}
    </div>
  );
};

export default DropzoneInput;
