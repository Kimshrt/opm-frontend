"use client";
import { bankListData, channelListData, incomeData } from "@/app/(page)/(backend)/drf/income-transfer/incomeData";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
import { formatAmount } from "@/hooks/formatAmount";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

export default function IncomeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState<{
    selected: Record<number, boolean>;
    selectAllGlobal: boolean;
  }>({
    selected: {},
    selectAllGlobal: false,
  });
  const tableData = incomeData;

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบคำขอ ID: ${id} ใช่หรือไม่?`)) {
      alert(`ลบคำขอเรียบร้อย (id: ${id})`);
    }
  };

  return (
    <div>
      <div className="flex justify-end ">
        <Link href="income-transfer/create">
          <Button size="sm" variant="outline">
            สร้างรายการรับเงิน
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
            header: "วันที่รับเงิน",
            accessor: "incomeDate",
            className: "text-center",
          },
          {
            header: "รายละเอียดรายการ",
            accessor: "detail",
          },
          {
            header: "ช่องทางรับเงิน",
            accessor: "channel_id",
            className: "text-center",
            render: (row) => {
              const channel = channelListData.find((c) => c.id === row.channel_id);

              return (
                <div className="flex items-center justify-center space-x-2">
                  <div>{channel ? channel.name : ""}</div>
                </div>
              );
            },
          },
          {
            header: "จำนวน (บาท)",
            accessor: "amount",
            className: "text-center",
            render: (row) => (
              <div>{formatAmount(row.amount)}</div>
            ),
          },
          {
            header: "ธนาคาร",
            accessor: "bank_id",
            className: "text-center",
            render: (row) => {
              const channel = bankListData.find((c) => c.id === row.channel_id);
              return (
                <div className="flex items-center justify-center space-x-2">
                  <div>{channel ? channel.name : ""}</div>
                </div>
              );
            }
          },
          {
            header: "ผู้โอนเงิน",
            accessor: "payer",
            className: "text-center",
          },
          {
            header: "การจัดการ",
            className: "text-center",

            render: (row) => (
              <div className="flex items-center justify-center space-x-2">
                <Link
                  href={`income-transfer/view/${row.id}`}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                  title="ดูรายละเอียด"
                >
                  <FiEye className="w-4 h-4" />
                </Link>
                <Link
                  href={`income-transfer/edit/${row.id}`}
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