"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import DatePicker from "@/components/form/date-picker";
import Select from "@/components/form/Select";

type FormValues = {
  id: string;
  title: string;
  date: string;
  resolution: string;
  detail: string;
};

const schema = yup.object({
  id: yup.string().required("กรุณากรอกรหัสวาระ/มติ"),
  title: yup.string().required("กรุณากรอกเรื่องวาระ/มติ"),
  date: yup.string().required("กรุณาเลือกวันที่ประชุม"),
  resolution: yup.string().required("กรุณาเลือกมติ"),
  detail: yup.string().required("กรุณากรอกรายละเอียด"),
});

export default function MeetingResolutionsForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",
      title: "",
      date: "",
      resolution: "",
      detail: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div>
      <ComponentCard title="จัดการวาระ/มติการประชุม">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="รหัสวาระ/มติ"
            {...register("id")}
            error={!!errors.id}
            errorMessage={errors.id?.message}
          />

          <Input
            placeholder="เรื่อง"
            {...register("title")}
            error={!!errors.title}
            errorMessage={errors.title?.message}
          />

          <DatePicker
            name="date"
            control={control}
            id="date"
            label="วันที่ประชุม"
            placeholder="เลือกวันที่"
          />

          <Select
            options={[
              { value: "approve", label: "อนุมัติ" },
              { value: "not_approve", label: "ไม่อนุมัติ" },
              { value: "acknowledge", label: "รับทราบ" },
            ]}
            placeholder="เลือกมติ"
            register={register("resolution")}
            error={!!errors.resolution}
            errorMessage={errors.resolution?.message}
          />

          <div>
            <textarea
              rows={4}
              placeholder="รายละเอียดเพิ่มเติม"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300"
              {...register("detail")}
            />
            {errors.detail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.detail.message}
              </p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="w-full">
              บันทึก
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
