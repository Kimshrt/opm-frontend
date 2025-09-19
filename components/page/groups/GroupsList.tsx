"use client";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

const tableData = [
  {
    id: 1,
    name: "Admin Group",
    description: "กลุ่มผู้ดูแลระบบ",
    members: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Editor Team",
    description: "ทีมบรรณาธิการ",
    members: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Reviewer",
    description: "ผู้ตรวจสอบเนื้อหา",
    members: 5,
    status: "Pending",
  },
  {
    id: 4,
    name: "Finance",
    description: "ฝ่ายการเงิน",
    members: 4,
    status: "Banned",
  },
  {
    id: 5,
    name: "HR",
    description: "ฝ่ายบุคคล",
    members: 6,
    status: "Active",
  },
];

export default function GroupsList() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบกลุ่ม ID: ${id} ใช่หรือไม่?`)) {
      // TODO: call API ลบกลุ่ม เช่น fetch(`/api/groups/${id}`, { method: "DELETE" })
      alert(`ลบกลุ่มเรียบร้อย (id: ${id})`);
    }
  };

  return (
    <BasicTableOne
      currentPage={currentPage}
      totalPages={2}
      setCurrentPage={setCurrentPage}
      data={tableData}
      columns={[
        {
          header: "ลำดับ",
          render: (_row, index) => <div>{index + 1}</div>,
          className: "text-center",
        },
        {
          header: "ชื่อกลุ่ม",
          accessor: "name",
        },
        {
          header: "รายละเอียด",
          accessor: "description",
        },
        {
          header: "จำนวนสมาชิก",
          accessor: "members",
          className: "text-center",
        },
        {
          header: "สถานะ",
          accessor: "status",
          className: "text-center",
        },
        {
          header: "การจัดการ",
          className: "text-center",
          render: (row) => (
            <div className="flex items-center justify-center space-x-2">
              <Link
                href={`/drf/groups/${row.id}/edit`}
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
  );
}
