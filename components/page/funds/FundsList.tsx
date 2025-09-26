"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import BasicTableOne from "@/components/tables/BasicTableOne";

export default function FundsList() {
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 mock data
  const tableData = [
    {
      id: 1,
      project: "โครงการสร้างสนามเด็กเล่นเพื่อชุมชน",
      date: "01/09/2568",
      status: "กำลังดำเนินการ",
    },
    {
      id: 2,
      project: "โครงการบริจาคหนังสือเพื่อโรงเรียนห่างไกล",
      date: "05/09/2568",
      status: "เสร็จสิ้น",
    },
    {
      id: 3,
      project: "โครงการปลูกต้นไม้เพิ่มพื้นที่สีเขียว",
      date: "10/09/2568",
      status: "รอดำเนินการ",
    },
    {
      id: 4,
      project: "โครงการซ่อมแซมศาลาชุมชน",
      date: "15/09/2568",
      status: "กำลังดำเนินการ",
    },
    {
      id: 5,
      project: "โครงการช่วยเหลือผู้ประสบภัยน้ำท่วม",
      date: "20/09/2568",
      status: "เสร็จสิ้น",
    },
  ];

  const handleDelete = (id:number) => {
    alert(`ลบโครงการหมายเลข: ${id}`);
  };

  return (
    <div>
      <BasicTableOne
        currentPage={currentPage}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        data={tableData}
        columns={[
          {
            header: "ลำดับ",
            accessor: "id",
            className: "text-center",
          },
          {
            header: "หัวข้อประกาศ",
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
                  href={`/drf/announcements/${row.id}/edit`}
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
