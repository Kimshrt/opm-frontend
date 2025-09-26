"use client";
import { contributionData } from "@/app/(page)/(backend)/drf/contribution/contributionData";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
import { formatAmount } from "@/hooks/formatAmount";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

export default function ContributionList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState<{
    selected: Record<number, boolean>;
    selectAllGlobal: boolean;
  }>({
    selected: {},
    selectAllGlobal: false,
  });
  const tableData = contributionData

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบคำขอ ID: ${id} ใช่หรือไม่?`)) {
      alert(`ลบคำขอเรียบร้อย (id: ${id})`);
    }
  };

  return (
    <div>
      <div className="flex justify-end ">
        {/* <Link href="/donations/create">
          <Button size="sm" variant="outline">
            สร้างโครงการ
          </Button>
        </Link> */}
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
            header: "ชื่อโครงการ",
            accessor: "project",
            className: "text-center",
            render(row) {
              return (
                <div className="w-[200px]">
                  {row.project}
                </div>
              );
            }
          },
          {
            header: "ผู้บริจาค",
            accessor: "fullname",
            className: "text-center",
            render(row) {
              return (
                <div className="w-[150px]">
                  {row.fullname}
                </div>
              );
            }
          },
          {
            header: "เบอร์โทรศัพท์",
            accessor: "phoneNumber",
            className: "text-center",
            render(row) {
              return (
                <div className="w-[150px]">
                  {row.phoneNumber}
                </div>
              );
            }
          },
          {
            header: "อีเมล",
            accessor: "email",
            className: "text-center",
          },
          {
            header: "สิ่งของบริจาค",
            accessor: "donations",
            className: "text-center",
            render(row, index) {
              return (
                <div>
                  {row.donations.map((donation: any, index: number) => {
                    return (
                      <div key={index} className="w-[200px]">
                        {index + 1}. {donation.item}
                      </div>
                    );
                  })}
                </div>
              );
            },
          },
          {
            header: "จำนวน",
            accessor: "donations",
            className: "text-center",
            render(row, index) {
              return (
                <div>
                  {row.donations.map((donation: any, index: number) => {
                    return (
                      <div key={index}>
                        {donation.quantity}
                      </div>
                    );
                  })}
                </div>
              );
            },
          },
          {
            header: "สิ่งของบริจาค",
            accessor: "donations",
            className: "text-center",
            render(row) {
              return (
                <div>
                  {row.donations.map((donation: any, index: number) => {
                    return (
                      <div key={index} className="w-[150px]">
                        {formatAmount(donation.price)} บาท
                      </div>
                    );
                  })}
                </div>
              );
            },
          },
          {
            header: "การจัดการ",
            className: "text-center",
            render: (row) => (
              <div className="flex items-center justify-center space-x-2">
                <Link
                  href={`contribution/view/${row.id}`}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                  title="ดูรายละเอียด"
                >
                  <FiEye className="w-4 h-4" />
                </Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
