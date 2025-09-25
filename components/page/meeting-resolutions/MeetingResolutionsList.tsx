"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";

export default function MeetingResolutionsList() {
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 mock data
  const tableData = [
    {
      id: 1,
      title: "การอนุมัติแผนงานปีงบประมาณ 2568",
      date: "01/09/2568",
      resolution: "อนุมัติ",
    },
    {
      id: 2,
      title: "การจัดตั้งคณะทำงานพิเศษ",
      date: "10/09/2568",
      resolution: "รับทราบ",
    },
    {
      id: 3,
      title: "การจัดซื้อครุภัณฑ์สำนักงาน",
      date: "15/09/2568",
      resolution: "ไม่อนุมัติ",
    },
  ];


  const handleDelete = (id: number) => {
    alert(`ลบวาระ/มติรหัส: ${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">วาระ/มติการประชุม</h1>
      <div className="flex justify-end mb-4">
        <Link href="/drf/resolutions/create" className="mr-2">
          <Button
            size="sm"
            variant="outline"
            className="w-40 justify-between !my-0"
          >
            สร้างวาระ/มติการประชุม
          </Button>
        </Link>
      </div>
      <BasicTableOne
        currentPage={currentPage}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        data={tableData}
        columns={[
          { header: "รหัส", accessor: "id", className: "text-center" },
          { header: "เรื่อง", accessor: "title" },
          { header: "วันที่", accessor: "date", className: "text-center" },
          {
            header: "มติ",
            accessor: "resolution",
            className: "text-center",
          },
          {
            header: "การจัดการ",
            className: "text-center",
            render: (row) => (
              <div className="flex items-center justify-center space-x-2">
                <Link
                  href={`/drf/meeting-resolutions/${row.id}/edit`}
                  className="p-2 text-yellow-500 hover:bg-yellow-100 rounded-full"
                  title="แก้ไข"
                >
                  <FiEdit className="w-4 h-4" />
                </Link>
                <button
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                  title="ลบ"
                  onClick={() => handleDelete(row.id)}
                >
                  <FiTrash className="w-4 h-4" />
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
