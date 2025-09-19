"use client";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

const tableData = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "ศิรินทร์ พรหมทอง",
    email: "sirin@example.com",
    role: "User",
    status: "Pending",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Banned",
  },
  {
    id: 5,
    name: "ปวีณา สุขสันต์",
    email: "paweena@example.com",
    role: "Moderator",
    status: "Active",
  }
];

export default function ListUser() {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบผู้ใช้ ID: ${id} ใช่หรือไม่?`)) {
      // TODO: call API ลบ user ได้เลย เช่น fetch(`/api/users/${id}`, { method: "DELETE" })
      alert(`ลบผู้ใช้เรียบร้อย (id: ${id})`);
    }
  };
  return (
    <BasicTableOne
      currentPage={currentPage}
      totalPages={3}
      setCurrentPage={setCurrentPage}
      data={tableData}
      columns={[
        {
          header: "ลำดับ",
          render: (_row, index) => <div>{index + 1}</div>,
          className: "text-center",
        },
        {
          header: "ชื่อ",
          accessor: "name",
        },
        {
          header: "อีเมล",
          accessor: "email",
        },
        {
          header: "สิทธิ์",
          accessor: "role",
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
                href={`/drf/users/${row.id}`}
                className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                title="ดู"
              >
                <FiEye className="w-4 h-4" />
              </Link>

              <Link
                href={`/drf/users/${row.id}/edit`}
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
