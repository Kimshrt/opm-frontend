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
import { Controller } from "react-hook-form";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
};

interface BasicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;

  name?: string;
  control?: any;
}

export default function BasicTableOne<T extends { id: number }>({
  data,
  columns,
  currentPage,
  totalPages,
  setCurrentPage,
  name,
  control,
}: BasicTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            {/* Header */}
            <TableHeader className="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="w-12 text-center px-4 py-3">
                  <Controller
                    name={name ? name  : ""}
                    control={control}
                    // 🟢 เปลี่ยน defaultValue ให้เก็บทั้ง selected + selectAllGlobal
                    defaultValue={{ selected: {}, selectAllGlobal: false }}
                    render={({ field }) => {
                      const { selected, selectAllGlobal } = field.value || {
                        selected: {},
                        selectAllGlobal: false,
                      };

                      // 🟢 allSelected = true ถ้า selectAllGlobal เปิดอยู่
                      const allSelected =
                        selectAllGlobal ||
                        (data.length > 0 &&
                          data.every((row) => selected[row.id]));

                      const toggleAll = () => {
                        field.onChange({
                          selected: {}, // reset local selections
                          selectAllGlobal: !allSelected, // toggle global flag
                        });
                      };

                      return (
                        <Checkbox
                          id={`${name}-all`}
                          checked={allSelected}
                          disabled={data.length === 0}
                          onChange={toggleAll}
                        />
                      );
                    }}
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

            {/* Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className="w-12 text-center px-4 py-3">
                    <Controller
                      name={name ? name  : ""}
                      control={control}
                      defaultValue={{ selected: {}, selectAllGlobal: false }}
                      render={({ field }) => {
                        const { selected, selectAllGlobal } = field.value || {
                          selected: {},
                          selectAllGlobal: false,
                        };

                        // 🟢 ถ้า selectAllGlobal = true → ทุก row checked
                        const checked =
                          selectAllGlobal || selected[row.id] || false;

                        const toggleOne = () => {
                          field.onChange({
                            selected: {
                              ...selected,
                              [row.id]: !checked,
                            },
                            selectAllGlobal: false, // 🟢 ยกเลิก global ถ้าแก้ทีละ row
                          });
                        };

                        return (
                          <Checkbox
                            id={`${name}-${row.id}`}
                            checked={checked}
                            onChange={toggleOne}
                          />
                        );
                      }}
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
