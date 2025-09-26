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
import Label from "@/components/form/Label";
import Editor from "@/components/ui/QuillEditor";
import FileInput from "@/components/form/input/FileInput";
import CopyInput from "@/components/ui/CopyInput";
import MultiSelect from "@/components/form/MultiSelect";

interface Props {
  id?: string;
}

// 🔹 type ของข้อมูลฟอร์ม
type FormValues = {
  title: string;
  date: string;
  categories: string[];
  attachments: File[];
  description: string;
  status: string;
};

// 🔹 Yup schema
const schema = yup.object({
  title: yup.string().required("กรุณากรอกหัวข้อประกาศ"),
  date: yup.string().required("กรุณาเลือกวันที่ประกาศ"),
  categories: yup.array().of(yup.string().required()).default([]),

  attachments: yup.mixed<File[]>().default([]),
  description: yup.string().required("กรุณากรอกรายละเอียดประกาศ"),
  status: yup.string().required("กรุณาเลือกสถานะ"),
});

export default function FundsForm({ id }: Props) {
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
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div>
      <ComponentCard title="จัดการประกาศ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4"
        >
          {/* Title */}
          <div className="col-span-12">
            <Label required error={!!errors.title}>
              หัวข้อ
            </Label>
            <Input
              type="text"
              placeholder="หัวข้อ"
              {...register("title")}
              error={!!errors.title}
              errorMessage={errors.title?.message}
            />
          </div>

          {/* Date */}
          <div className="col-span-12">
            <Label required error={!!errors.date}>
              วันที่ประกาศ
            </Label>
            <DatePicker
              name="date"
              control={control}
              id="date"
              placeholder="เลือกวันที่"
            />
          </div>

          {/* Categories */}
          <div className="col-span-12">
            <Label error={!!errors.categories}>
              หมวดหมู่
            </Label>
            <MultiSelect
              name="categories"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
                { value: "5", label: "Option 5" },
              ]}
              control={control}
              error={!!errors.categories}
              errorMessage={errors.categories?.message}
            />
          </div>

          {/* Attachments */}
          <div className="col-span-12">
            <Label error={!!errors.attachments}>
              ไฟล์แนบ
            </Label>
            <FileInput
              register={register("attachments")}
              error={!!errors.attachments}
              errorMessage={errors.attachments?.message}
              className="flex-1 w-full"
            />
          </div>

          {/* Description */}
          <div className="col-span-12">
            <Label required error={!!errors.description}>
              รายละเอียดประกาศ
            </Label>
            <Editor
              name="description"
              control={control}
              error={!!errors.description}
              errorMessage={errors.description?.message}
            />
          </div>

          {/* Copy URL */}
          <div className="col-span-12">
            <Label>Url Form รับบริจาคสิ่งของ</Label>
            <CopyInput path={`form-donation/${id}`} />
          </div>

          {/* Status */}
          <div className="col-span-12">
            <Label required error={!!errors.status}>
              สถานะ
            </Label>
            <Select
              options={[
                { value: "ใช้งาน", label: "ใช้งาน" },
                { value: "ไม่ใช้งาน", label: "ไม่ใช้งาน" },
              ]}
              placeholder="เลือกสถานะ"
              register={register("status")}
              error={!!errors.status}
              errorMessage={errors.status?.message}
            />
          </div>

          {/* Actions */}
          <div className="col-span-12 flex justify-between mt-4">
            <Button
              size="sm"
              className="!border-red-500 !text-red-500"
              type="button"
              variant="outline"
              onClick={() => reset()}
            >
              ยกเลิก
            </Button>
            <Button size="sm" type="submit">
              อนุมัติ
            </Button>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
