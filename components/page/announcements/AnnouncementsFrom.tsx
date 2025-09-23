"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import DatePicker from "@/components/form/date-picker";

// 🔹 type ของข้อมูลฟอร์ม
type FormValues = {
  requestId: string;
  project: string;
  date: string;
  province: string;
  status: string;
  description: string;
};

// 🔹 Yup schema
const schema = yup
  .object({
    requestId: yup.string().required("กรุณากรอกหมายเลขคำขอ"),
    project: yup.string().required("กรุณากรอกชื่อโครงการ"),
    date: yup.string().required("กรุณาเลือกวันที่"),
    province: yup.string().required("กรุณาเลือกจังหวัด"),
    status: yup.string().required("กรุณาเลือกสถานะ"),
    description: yup.string().required("กรุณากรอกรายละเอียดประกาศ"),
  })
  .required();

export default function AnnouncementsForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    alert(JSON.stringify(data, null, 2)); // แสดงเป็น JSON อ่านง่าย
    reset();
  };

  return (
    <div>
      <ComponentCard title="จัดการประกาศ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Request ID */}
          <Input
            type="text"
            placeholder="หมายเลขคำขอ"
            {...register("requestId")}
            error={!!errors.requestId}
            errorMessage={errors.requestId?.message}
          />

          {/* Project */}
          <Input
            type="text"
            placeholder="ชื่อโครงการ"
            {...register("project")}
            error={!!errors.project}
            errorMessage={errors.project?.message}
          />

          {/* Date */}
          <DatePicker
            name="date"
            control={control}
            id="date"
            label="เลือกวันที่"
            placeholder="กรุณาเลือกวันที่"
          />

          {/* Province */}
          <Select
            options={[
              { value: "bangkok", label: "กรุงเทพมหานคร" },
              { value: "chiangmai", label: "เชียงใหม่" },
              { value: "khonkaen", label: "ขอนแก่น" },
            ]}
            placeholder="เลือกจังหวัด"
            register={register("province")}
            error={!!errors.province}
            errorMessage={errors.province?.message}
          />

          {/* Status */}
          <Select
            options={[
              { value: "pending", label: "รอดำเนินการ" },
              { value: "inprogress", label: "กำลังดำเนินการ" },
              { value: "completed", label: "เสร็จสิ้น" },
            ]}
            placeholder="เลือกสถานะ"
            register={register("status")}
            error={!!errors.status}
            errorMessage={errors.status?.message}
          />

          {/* Description */}
          <div>
            <textarea
              rows={4}
              placeholder="รายละเอียดประกาศ"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="w-full">
              บันทึกประกาศ
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => reset()}
            >
              ล้างค่า
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
