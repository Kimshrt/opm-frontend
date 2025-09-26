"use client";
import { contributionData } from "@/app/(page)/(backend)/drf/contribution/contributionData";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
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
          },
          {
            header: "ผู้บริจาค",
            accessor: "fullname",
            className: "text-center",
          },
          {
            header: "เบอร์โทรศัพท์",
            accessor: "phoneNumber",
            className: "text-center",
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
                      <div key={index}>
                        {index + 1}. {donation.item} จำนวน {donation.quantity} - {donation.price} บาท
                      </div>
                    );
                  })}
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
