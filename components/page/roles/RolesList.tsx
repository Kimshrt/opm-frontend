"use client";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

const tableData = [
  {
    id: 1,
    name: "Admin",
    description: "จัดการระบบทั้งหมด",
    users: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Editor",
    description: "แก้ไขเนื้อหาได้",
    users: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Viewer",
    description: "ดูข้อมูลได้อย่างเดียว",
    users: 12,
    status: "Pending",
  },
  {
    id: 4,
    name: "Moderator",
    description: "ดูแล community",
    users: 3,
    status: "Banned",
  },
];

export default function RolesList() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบบทบาท ID: ${id} ใช่หรือไม่?`)) {
      // TODO: call API ลบ role เช่น fetch(`/api/roles/${id}`, { method: "DELETE" })
      alert(`ลบบทบาทเรียบร้อย (id: ${id})`);
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
          header: "ชื่อบทบาท",
          accessor: "name",
        },
        {
          header: "รายละเอียด",
          accessor: "description",
        },
        {
          header: "จำนวนผู้ใช้งาน",
          accessor: "users",
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
                href={`/drf/roles/${row.id}/edit`}
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
