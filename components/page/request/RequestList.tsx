"use client";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import Link from "next/link";

// ✅ ตัวอย่างข้อมูล
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

// ✅ รายการภัยพิบัติในประเทศไทย (มี id สำหรับใช้ใน path)
const disasters = [
  { id: "1", label: "น้ำท่วม" },
  { id: "2", label: "ไฟป่า" },
  { id: "3", label: "แผ่นดินไหว" },
  { id: "4", label: "พายุ" },
  { id: "5", label: "ภัยแล้ง" },
  { id: "6", label: "ดินถล่ม" },
  { id: "7", label: "สึนามิ" },
];

export default function RequestList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState("สร้างคำขอ");

  const router = useRouter();

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  const handleSelectDisaster = (disaster: { id: string; label: string }) => {
    setSelectedDisaster(disaster.label);
    closeDropdown();
    // 👉 redirect ไปยังหน้าสร้างคำขอ
    router.push(`/drf/request/create/${disaster.id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm(`คุณต้องการลบคำร้อง ID: ${id} ใช่หรือไม่?`)) {
      alert(`ลบคำร้องเรียบร้อย (id: ${id})`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">คำขอ</h1>

      {/* Dropdown ภัยพิบัติ */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <Button
            size="sm"
            variant="outline"
            onClick={openDropdown}
            className="w-40 justify-between !my-0"
          >
            {selectedDisaster}
          </Button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            {disasters.map((disaster) => (
              <DropdownItem
                key={disaster.id}
                onItemClick={() => handleSelectDisaster(disaster)}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {disaster.label}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* ตาราง */}
      <BasicTableOne
        currentPage={currentPage}
        totalPages={1}
        setCurrentPage={setCurrentPage}
        data={tableData}
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
                <Link href={`/drf/request/edit/${row.id}/1`} passHref>
                  <button
                    className="p-2 text-yellow-500 hover:bg-yellow-100 rounded-full"
                    title="แก้ไขคำร้อง"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                </Link>

                {/* ลบ */}
                <button
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                  title="ลบคำร้อง"
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
