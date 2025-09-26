"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import FileInput from "@/components/form/input/FileInput";
import BasicTableOne from "@/components/tables/BasicTableOne";

// mock data: โครงการ
const project = {
  province: "เชียงใหม่",
  purpose: "ช่วยเหลือผู้ประสบภัยน้ำท่วม",
  totalAmount: 500000,
};


type FormValues = {
  approvalDoc: string;
  amount: number;
};

export default function DisbursementForm() {
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
  const [totalPages, setTotalPages] = useState(1);
  const { register, handleSubmit, control } = useForm<FormValues>();
  const [search, setSearch] = useState("");

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", { ...data, selection });
    alert(JSON.stringify({ ...data, selection }, null, 2));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/test?page=${currentPage}&limit=10&search=${encodeURIComponent(
            search
          )}`
        );
        const data = await res.json();

        setAccountList(data.data); // 👈 ใช้ data.data
        setTotalPages(data.pagination.totalPages); // 👈 ใช้ pagination.totalPages
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [currentPage, search]); // 👈 refetch เมื่อ search เปลี่ยน

  return (
    <div>
      <ComponentCard title="โอนเงินไปยัง ปภ.จังหวัด">
        {/* 🔹 การ์ดโครงการ */}
        <div className="p-4 mb-6 border rounded-md bg-gray-50">
          <p>
            <strong>จังหวัด:</strong> {project.province}
          </p>
          <p>
            <strong>วัตถุประสงค์:</strong> {project.purpose}
          </p>
          <p>
            <strong>จำนวนเงินทั้งหมด:</strong>{" "}
            {project.totalAmount.toLocaleString()} บาท
          </p>
        </div>

        {/* 🔹 ฟอร์ม */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4"
        >
          {/* ใบอนุมัติ */}
          <div className="col-span-12 md:col-span-6">
            <Label
              required
              // error={!!errors.approvalDoc}
            >
              ใบอนุมัติ
            </Label>
            <FileInput
              register={register("approvalDoc")}
              //   error={!!errors.approvalDoc}
              //   errorMessage={errors.approvalDoc?.message}
              className="flex-1 w-full"
            />
          </div>
          {/* จำนวนเงินที่ต้องการโอน */}

          <div className="col-span-12 md:col-span-6">
            <Label
              required
              // error={!!errors.amount}
            >
              จำนวนเงินที่ต้องการโอน
            </Label>
            <Input
              type="number"
              placeholder="0.00"
              {...register("amount")}
              //   error={!!errors.amount}
              //   errorMessage={errors.amount?.message}
            />
          </div>

          {/* ค้นหาบัญชี */}
          <div className="col-span-12 md:col-span-6">
            <Label>ค้นหาบัญชี</Label>
            <Input
              type="text"
              placeholder="ค้นหาชื่อบัญชี"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // 👈 reset กลับไปหน้าแรกเมื่อค้นหาใหม่
              }}
            />
          </div>
          <div className="col-span-12">
            {/* ตารางบัญชี */}
            <BasicTableOne
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              data={accountList}
              selection={selection}
              setSelection={setSelection}
              columns={[
                {
                  header: "ลำดับ",
                  render: (_row, index) => <div>{index + 1}</div>,
                },
                { header: "เลขบัญชี", accessor: "number" },
                { header: "ชื่อบัญชี", accessor: "name" },
                { header: "ธนาคาร", accessor: "bank" },
              ]}
            />
          </div>

          {/* ปุ่ม */}
          <div className="col-span-12 flex justify-end space-x-4 mt-4">
            <Button
              type="button"
              variant="outline"
              className="!border-red-500 !text-red-500"
            >
              ยกเลิก
            </Button>
            <Button type="submit">ยืนยันการโอน</Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
