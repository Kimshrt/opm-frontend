"use client";
import { bankData } from "@/app/(page)/(backend)/drf/bank/bankData";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

export default function BankList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState<{
    selected: Record<number, boolean>;
    selectAllGlobal: boolean;
  }>({
    selected: {},
    selectAllGlobal: false,
  });
  const tableData = bankData;

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบคำขอ ID: ${id} ใช่หรือไม่?`)) {
      alert(`ลบคำขอเรียบร้อย (id: ${id})`);
    }
  };

  return (
    <div>
      <div className="flex justify-end ">
        <Link href="bank/create">
          <Button size="sm" variant="outline">
            สร้างข้อมูลธนาคาร
          </Button>
        </Link>
      </div>
      <BasicTableOne
        currentPage={currentPage}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        data={tableData}
        selection={selection}
        setSelection={setSelection}
        columns={[
          {
            header: "หมายเลขบัญชี",
            accessor: "accountNumber",
            className: "text-center",
          },
          {
            header: "ชื่อบัญชีธนาคาร",
            accessor: "accountName",
          },
          {
            header: "วัน/เดือน/ปี",
            accessor: "openDate",
            className: "text-center",
          },
          {
            header: "หน่วยงาน",
            accessor: "department",
            className: "text-center",
            render: (row) => (
              <span>
                {row.department?.name}
              </span>
            ),
          },
          {
            header: "สถานะ",
            accessor: "isActive",
            className: "text-center",
            render: (row) => (
              <span
                className={`font-medium ${row.isActive ? "text" : "text-red-600"}`}
              >
                {row.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
              </span>
            ),
          },
          {
            header: "การจัดการ",
            className: "text-center",
            render: (row) => (
              <div className="flex items-center justify-center space-x-2">
                <Link
                  href={`bank/view/${row.id}`}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                  title="ดูรายละเอียด"
                >
                  <FiEye className="w-4 h-4" />
                </Link>
                <Link
                  href={`bank/edit/${row.id}`}
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