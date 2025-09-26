"use client";

import React, { useState, useEffect } from "react";

interface CopyInputProps {
  value?: string; // ทำเป็น optional
  path?: string;
}

const CopyInput: React.FC<CopyInputProps> = ({ value, path }) => {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState<string>(value || "");

  useEffect(() => {
    if (!value && typeof window !== "undefined") {
      setUrl(`${window.location.origin}/${path}`);
    }
  }, [value, path]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // reset หลัง 3 วิ
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center border rounded-md overflow-hidden h-[44px]">
      <input
        type="text"
        value={url}
        readOnly
        className="flex-1 px-3 py-2 text-sm text-gray-700 bg-white outline-none"
      />
      <button
        type="button"
        onClick={handleCopy}
        className={`px-3 py-2 text-base border-l min-w-[70px]  h-[44px] text-center ${copied ? "bg-green-100 text-green-700" : "bg-gray-100 hover:bg-gray-200"
          }`}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyInput;
