"use client";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema Validation
const schema = yup.object({
  name: yup.string().required("กรุณากรอกชื่อบทบาท"),
  description: yup.string().required("กรุณากรอกรายละเอียด"),
  status: yup.string().required("กรุณาเลือกสถานะ"),
});

type RoleFormData = yup.InferType<typeof schema>;

export default function RolesEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "Admin",
      description: "จัดการระบบทั้งหมด",
      status: "Active",
    },
  });

  const onSubmit = (data: RoleFormData) => {
    console.log("อัปเดตบทบาท:", data);
    alert("แก้ไขบทบาทเรียบร้อย");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        แก้ไขบทบาท
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        {/* Role Name */}
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ชื่อบทบาท
          </label>
          <Input
            type="text"
            {...register("name")}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            รายละเอียด
          </label>
          <Input
            type="text"
            {...register("description")}
            error={!!errors.description}
            errorMessage={errors.description?.message}
          />
        </div>

        {/* Status */}
        <div className="col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            สถานะ
          </label>
          <Select
            options={[
              { value: "Active", label: "Active" },
              { value: "Pending", label: "Pending" },
              { value: "Banned", label: "Banned" },
            ]}
            placeholder="เลือกสถานะ"
            register={register("status")}
            error={!!errors.status}
            errorMessage={errors.status?.message}
          />
        </div>

        {/* Submit */}
        <div className="col-span-2 pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            บันทึกการแก้ไข
          </button>
        </div>
      </form>
    </div>
  );
}
