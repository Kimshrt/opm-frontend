"use client";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema Validation
const schema = yup.object({
  name: yup.string().required("กรุณากรอกชื่อกลุ่ม"),
  description: yup.string().required("กรุณากรอกรายละเอียดกลุ่ม"),
  status: yup.string().required("กรุณาเลือกสถานะ"),
});

type GroupFormData = yup.InferType<typeof schema>;

export default function GroupsEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "Admin Group",
      description: "กลุ่มผู้ดูแลระบบ",
      status: "Active",
    },
  });

  const onSubmit = (data: GroupFormData) => {
    console.log("อัปเดตข้อมูลกลุ่ม:", data);
    alert("แก้ไขข้อมูลกลุ่มเรียบร้อย");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        แก้ไขข้อมูลกลุ่มผู้ใช้งาน
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 "
      >
        {/* Group Name */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ชื่อกลุ่ม
          </label>
          <Input
            type="text"
            {...register("name")}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
        </div>

        {/* Description */}
        <div className="col-span-2 lg:col-span-1">
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
        <div className="col-span-2">
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
