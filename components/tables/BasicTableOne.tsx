"use client";
import React from "react";
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

interface SelectionState {
  selected: Record<number, boolean>;
  selectAllGlobal: boolean;
}

interface BasicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;

  selection?: SelectionState;
  setSelection?: (s: SelectionState) => void;
}

export default function BasicTableOne<T extends { id: number }>({
  data,
  columns,
  currentPage,
  totalPages,
  setCurrentPage,
  selection,
  setSelection,
}: BasicTableProps<T>) {
  const { selected, selectAllGlobal } = selection ?? {
    selected: {},
    selectAllGlobal: false,
  };

  // 🟢 toggle all
  const toggleAll = () => {
    if (!setSelection) return;
    setSelection({
      selected: {}, // reset รายการที่เลือกเอง
      selectAllGlobal: !selectAllGlobal,
    });
  };

  // 🟢 toggle row
  const toggleOne = (id: number) => {
    if (!setSelection) return;
    setSelection({
      selected: {
        ...selected,
        [id]: !selected[id],
      },
      selectAllGlobal: false, // ยกเลิก global ถ้ามีการติ๊กทีละตัว
    });
  };

  // 🟢 checked ของ header
  const allSelected =
    selectAllGlobal || (data.length > 0 && data.every((row) => selected[row.id]));

  const isCompact = columns.length <= 7;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="w-full overflow-x-auto">
        <div
          className={isCompact ? "min-w-[1000px]" : "w-full max-w-[1000px]"}
        >
          <Table>
            {/* ✅ Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-900/30">
              <TableRow>
                <TableCell className="w-12 text-center px-4 py-3">
                  <Checkbox
                    id="select-all"
                    checked={allSelected}
                    disabled={data.length === 0}
                    onChange={toggleAll}
                  />
                </TableCell>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    className={`px-5 py-3 font-medium text-gray-600 dark:text-gray-300 ${col.className ?? "text-start"
                      }`}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* ✅ Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, index) => {
                const checked =
                  selectAllGlobal || selected[row.id] || false;

                return (
                  <TableRow key={row.id}>
                    <TableCell className="w-12 text-center px-4 py-3">
                      <Checkbox
                        id={`row-${row.id}`}
                        checked={checked}
                        onChange={() => toggleOne(row.id)}
                      />
                    </TableCell>

                    {columns.map((col, idx) => (
                      <TableCell
                        key={idx}
                        className="px-5 py-3 text-gray-700 dark:text-gray-300"
                      >
                        {col.render
                          ? col.render(row, index)
                          : col.accessor
                            ? (row[col.accessor] as React.ReactNode)
                            : null}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-white/[0.05]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}