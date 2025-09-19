"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Checkbox from "../form/input/Checkbox";
import Pagination from "./Pagination";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T, index: number) => React.ReactNode; // 👈 index เพิ่มมา
  className?: string;
};

interface BasicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function BasicTableOne<T extends { id: number }>({
  data,
  columns,
  currentPage,
  totalPages,
  setCurrentPage
}: BasicTableProps<T>) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((o) => o.id));
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
            {/* ✅ Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/30">
              <TableRow>
                <TableCell className="w-12 text-center px-4 py-3">
                  <Checkbox
                    checked={selected.length === data.length}
                    onChange={toggleAll}
                  />
                </TableCell>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    className={`px-5 py-3 font-medium text-gray-600 dark:text-gray-300 ${
                      col.className ?? "text-start"
                    }`}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* ✅ Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  {/* Checkbox */}
                  <TableCell className="w-12 text-center px-4 py-3">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onChange={() => toggleSelect(row.id)}
                    />
                  </TableCell>

                  {/* Dynamic Columns */}
                  {columns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      className={`px-5 py-3 text-gray-700 dark:text-gray-300 ${
                        col.className ?? "text-start"
                      }`}
                    >
                      {col.render
                        ? col.render(row, index) // 👈 ส่ง index เข้าไปด้วย
                        : col.accessor
                        ? (row[col.accessor] as React.ReactNode)
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
           <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
      </div>
    </div>
  );
}
