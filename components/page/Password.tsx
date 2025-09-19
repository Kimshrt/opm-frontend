"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/form/input/InputField";
import { useRouter } from "next/navigation";
import Button from "../ui/button/Button";
import ComponentCard from "../common/ComponentCard";
import { EyeCloseIcon, EyeIcon } from "@/icons";

// ✅ Schema Validation
const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("กรุณากรอกรหัสผ่านเก่า")
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่านใหม่")
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "รหัสผ่านไม่ตรงกัน")
    .required("กรุณากรอกยืนยันรหัสผ่าน"),
});

type FormValues = yup.InferType<typeof schema>;

export default function Password() {
  const router = useRouter();

  // 👀 state toggle แยกแต่ละช่อง
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Password form:", data);
    alert("บันทึกรหัสผ่านสำเร็จ!");
  };

  return (
    <ComponentCard title="ตั้งค่ารหัสผ่านใหม่">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            รหัสผ่านเก่า
          </label>
          <div className="relative">
            <Input
              type={showOld ? "text" : "password"}
              {...register("oldPassword")}
              error={!!errors.oldPassword}
              errorMessage={errors.oldPassword?.message}
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showOld ? (
                <EyeIcon className="" />
              ) : (
                <EyeCloseIcon className="" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            รหัสผ่านใหม่
          </label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showNew ? (
                <EyeIcon className="" />
              ) : (
                <EyeCloseIcon className="" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            ยืนยันรหัสผ่านใหม่
          </label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirm ? (
                <EyeIcon className="" />
              ) : (
                <EyeCloseIcon className="" />
              )}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between gap-3 pt-4">
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            ยกเลิก
          </Button>
          <Button size="sm" type="submit">
            บันทึกรหัสผ่าน
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
