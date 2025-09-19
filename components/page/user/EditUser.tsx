"use client";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/ui/button/Button";

// 🔹 Schema Validation ด้วย Yup
const schema = yup.object({
  prefix: yup.string().required("กรุณากรอกคำนำหน้า"),
  firstName: yup.string().required("กรุณากรอกชื่อจริง"),
  lastName: yup.string().required("กรุณากรอกนามสกุล"),
  email: yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
  phone: yup
    .string()
    .matches(/^[0-9]{9,10}$/, "กรุณากรอกเบอร์โทรให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
  organization: yup.string().required("กรุณาเลือกหน่วยงาน"),
  position: yup.string().required("กรุณากรอกตำแหน่ง"),
  role: yup.string().required("กรุณาเลือกสิทธิ์การใช้งาน"),
  status: yup.string().required("กรุณาเลือกสถานะ"),
});

type UserFormData = yup.InferType<typeof schema>;

export default function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      prefix: "นาย",
      firstName: "สมชาย",
      lastName: "ใจดี",
      email: "somchai.jaidee@example.com",
      phone: "0812345678",
      organization: "opm",
      position: "เจ้าหน้าที่บริหารงานทั่วไป",
      role: "Admin",
      status: "Active",
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log("อัปเดตข้อมูลผู้ใช้:", data);
    alert("แก้ไขข้อมูลผู้ใช้เรียบร้อย");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        แก้ไขข้อมูลผู้ใช้
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid  gap-4 grid-cols-2"
      >
        {/* Prefix */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            คำนำหน้า
          </label>
          <Input
            type="text"
            {...register("prefix")}
            error={!!errors.prefix}
            errorMessage={errors.prefix?.message}
          />
        </div>

        {/* First Name */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ชื่อจริง
          </label>
          <Input
            type="text"
            {...register("firstName")}
            error={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
        </div>

        {/* Last Name */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            นามสกุล
          </label>
          <Input
            type="text"
            {...register("lastName")}
            error={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
        </div>

        {/* Email */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            อีเมล
          </label>
          <Input
            type="email"
            {...register("email")}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>

        {/* Phone */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            เบอร์โทรศัพท์
          </label>
          <Input
            type="text"
            {...register("phone")}
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        </div>

        {/* Organization */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            หน่วยงาน
          </label>
          <Select
            options={[
              { value: "opm", label: "สำนักปลัดสำนักนายกรัฐมนตรี" },
              { value: "moi", label: "กระทรวงมหาดไทย" },
              { value: "moe", label: "กระทรวงศึกษาธิการ" },
              { value: "mof", label: "กระทรวงการคลัง" },
              { value: "moph", label: "กระทรวงสาธารณสุข" },
            ]}
            placeholder="เลือกหน่วยงาน"
            register={register("organization")}
            error={!!errors.organization}
            errorMessage={errors.organization?.message}
          />
        </div>

        {/* Position */}
        <div className="col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ตำแหน่ง
          </label>
          <Input
            type="text"
            {...register("position")}
            error={!!errors.position}
            errorMessage={errors.position?.message}
          />
        </div>

        {/* Role */}
        <div className="col-span-2 lg:col-span-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            สิทธิ์การใช้งาน (Role)
          </label>
          <Select
            options={[
              { value: "Admin", label: "Admin" },
              { value: "User", label: "User" },
              { value: "Editor", label: "Editor" },
              { value: "Moderator", label: "Moderator" },
            ]}
            placeholder="เลือกสิทธิ์การใช้งาน"
            register={register("role")}
            error={!!errors.role}
            errorMessage={errors.role?.message}
          />
        </div>

        {/* Status */}
        <div className="col-span-2 lg:col-span-1">
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
        <div className="col-span-2 pt-4 text-center">
          <Button type="submit" variant="primary" size="sm">
            บันทึกการแก้ไข
          </Button>
        </div>
      </form>
    </div>
  );
}
