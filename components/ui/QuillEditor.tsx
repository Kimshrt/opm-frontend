"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import "quill/dist/quill.snow.css";

// 👇 โหลด Quill แค่ฝั่ง client
// (Quill is imported dynamically inside useEffect below)

interface Props {
  control: any;
  name: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

function Editor({
  name,
  control,
  disabled = false,
  error,
  errorMessage,
}: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<any>(null);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => {
          useEffect(() => {
            // โหลด Quill เฉพาะตอน client
            if (editorRef.current && !quillInstance.current) {
              import("quill").then(({ default: Quill }) => {
                quillInstance.current = new Quill(editorRef.current!, {
                  theme: "snow",
                  modules: {
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ font: [] }],
                      [{ size: ["small", false, "large", "huge"] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [{ script: "sub" }, { script: "super" }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ indent: "-1" }, { indent: "+1" }],
                      [{ direction: "rtl" }],
                      [{ align: [] }],
                      ["link", "image", "video"],
                      ["blockquote", "code-block", "formula"],
                      ["clean"],
                    ],
                  },
                  readOnly: disabled,
                });

                quillInstance.current.on("text-change", () => {
                  const html =
                    editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
                  if (html !== field.value) {
                    field.onChange(html);
                  }
                });

                // initial value
                quillInstance.current.root.innerHTML = field.value || "";
              });
            }

            // sync external value → quill
            if (
              quillInstance.current &&
              field.value !== quillInstance.current.root.innerHTML
            ) {
              quillInstance.current.root.innerHTML = field.value || "";
            }
          }, [field.value, disabled]);

          return (
            <div>
              <div
                ref={editorRef}
                className={`rounded-md ${
                  error ? "border border-red-500" : "border border-gray-300"
                }`}
                style={{ height: "300px" }}
              />
              {error && errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default Editor;
