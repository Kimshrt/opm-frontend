"use client";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

// ✅ ตัวอย่างข้อมูล
const tableData = [
  {
    id: 1,
    project: "โครงการช่วยเหลือผู้ประสบอุทกภัย จ.เชียงใหม่",
    date: "01/09/2025",
    status: "กำลังพิจารณา",
  },
  {
    id: 2,
    project: "โครงการช่วยเหลือเหตุไฟป่าภาคเหนือ",
    date: "15/08/2025",
    status: "อนุมัติ",
  },
  {
    id: 3,
    project: "โครงการช่วยเหลือผู้ประสบภัยแผ่นดินไหว",
    date: "05/07/2025",
    status: "ไม่อนุมัติ",
  },
];

export default function DonationsList() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบคำขอ ID: ${id} ใช่หรือไม่?`)) {
      alert(`ลบคำขอเรียบร้อย (id: ${id})`);
    }
  };

  return (
    <div>
      <div className="flex justify-end ">
        <Link href="/donations/create">
          <Button size="sm" variant="outline">
            สร้างโครงการ
          </Button>
        </Link>
      </div>
      <BasicTableOne
        currentPage={currentPage}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        data={tableData}
        columns={[
          {
            header: "เลขคำขอ",
            accessor: "id",
            className: "text-center",
          },
          {
            header: "ชื่อโครงการ",
            accessor: "project",
          },
          {
            header: "วัน/เดือน/ปี",
            accessor: "date",
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
                  href={`/donations/${row.id}`}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                  title="ดูรายละเอียด"
                >
                  <FiEye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/donations/${row.id}/edit`}
                  className="p-2 text-yellow-500 hover:bg-yellow-100 rounded-full"
                  title="แก้ไขโครงการ"
                >
                  <FiEdit className="w-4 h-4" />
                </Link>
                <button
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                  title="ลบโครงการ"
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
