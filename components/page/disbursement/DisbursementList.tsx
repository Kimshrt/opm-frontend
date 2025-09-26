"use client";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Link from "next/link";
import React, { useState } from "react";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";

const tableData = [
  {
    id: 1,
    org: "น่าน",
    purpose: "ขอรับเงินบริจาคช่วยเหลือผู้ประสบอุทกภัย จ.เชียงใหม่",
    amount: "500,000 บาท",
    status: "กำลังพิจารณา",
  },
  {
    id: 2,
    org: "กรุงเทพ",
    purpose: "ขอรับเงินบริจาคช่วยเหลือเหตุไฟป่าภาคเหนือ",
    amount: "200,000 บาท",
    status: "อนุมัติ",
  },
  {
    id: 3,
    org: "ชลบุรี",
    purpose: "ขอรับเงินบริจาคช่วยเหลือผู้ประสบภัยแผ่นดินไหว",
    amount: "1,000,000 บาท",
    status: "ไม่อนุมัติ",
  },
];
export default function DisbursementList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [accountList, setAccountList] = useState<
    { id: number; number: number; name: string; bank: string }[]
  >([]);
  const [selection, setSelection] = useState<{
    selected: Record<number, boolean>;
    selectAllGlobal: boolean;
  }>({
    selected: {},
    selectAllGlobal: false,
  });
  return (
    <div>
      {/* ตาราง */}
      <BasicTableOne
        currentPage={currentPage}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        data={tableData}
        selection={selection}
        setSelection={setSelection}
        columns={[
          {
            header: "ลำดับ",
            render: (_row, index) => <div>{index + 1}</div>,
            className: "text-center",
          },
          {
            header: "จังหวัด",
            accessor: "org",
          },
          {
            header: "วัตถุประสงค์",
            accessor: "purpose",
          },
          {
            header: "จำนวนเงินทั้งหมด",
            accessor: "amount",
            className: "text-right",
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
                {/* ดูรายละเอียด */}
                <Link href={`/drf/request/view/${row.id}/1`} passHref>
                  <button
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                    title="ดูรายละเอียด"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                </Link>

                {/* แก้ไข */}
                <Link href={`/drf/disbursement/create/${row.id}`} passHref>
                  <button
                    className="p-2 text-yellow-500 hover:bg-yellow-100 rounded-full"
                    title="แก้ไขคำร้อง"
                  >
                    <FaMoneyBillWave className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
