"use client";
import React, { use, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import DatePicker from "@/components/form/date-picker";
import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import DropzoneInput from "@/components/form/input/DropZone";
import { formDonationFormValues } from "@/type/formDonationType";
import { FormDonationData } from "@/app/(page)/(frontend)/form-donation/[id]/formDonationData";

interface Props {
  id?: number;
}

const schema = yup.object({
  project: yup.string().required("กรุณากรอกชื่อโครงการ"),
  fullname: yup.string().required("กรุณากรอกชื่อ - นามสกุล"),
  phoneNumber: yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
  email: yup.string().required("กรุณากรอกอีเมลล์"),
  donations: yup
    .array()
    .of(
      yup.object({
        item: yup.string().required("กรุณากรอกสิ่งของบริจาค"),
        quantity: yup
          .number()
          .typeError("จำนวนต้องเป็นตัวเลข")
          .required("กรุณากรอกจํานวน")
          .min(1, "จำนวนต้องมากกว่า 0"),
        price: yup
          .number()
          .typeError("ราคาเป็นตัวเลข")
          .required("กรุณากรอกราคา")
          .min(1, "ราคาต้องมากกว่า 0"),
      })
    )
    .min(1, "ต้องมีรายการช่วยเหลืออย่างน้อย 1 รายการ")
    .required("ต้องมีรายการช่วยเหลืออย่างน้อย 1 รายการ"),
  files: yup
    .array()
    .min(1, "กรุณาอัพโหลดไฟล์อย่างน้อย 1 ไฟล์")
    .required("กรุณาอัพโหลดไฟล์"),
});



export default function DonationForm({ id }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<formDonationFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      donations: [{ item: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "donations",
    control,
  });

  const fetchData = async (id: number) => {
    try {
      // const response = await fetch(`/api/bank/${id}`);
      // const data = await response.json();
      const data = FormDonationData.find((item) => item.id === id);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await fetchData(Number(id));
        if (data) {
          reset(data);
        }
      }
    };
    loadData();
  }, [id, reset]);

  const onSubmit = (data: any) => {
    console.log("Form array data:", data);
    // alert(JSON.stringify(data, null, 2));
    // reset();
  };

  return (
    <div className="container mx-auto mt-4 px-4">
      <ComponentCard title="ฟอร์มรับบริจาคสิ่งของ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4 "
        >

          <div className="col-span-12 ">
            <Label required error={!!errors.project}>โครงการ</Label>
            <Input
              placeholder="โครงการ"
              disabled
              {...register("project")}
              error={!!errors.project}
              errorMessage={errors.project?.message}
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Label required error={!!errors.fullname}>ชื่อ - นามสกุล</Label>
            <Input
              placeholder="ชื่อ - นามสกุล"
              {...register("fullname")}
              error={!!errors.fullname}
              errorMessage={errors.fullname?.message}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label required error={!!errors.phoneNumber}>เบอร์โทรศัพท์</Label>
            <Input
              type="text"
              placeholder="เบอร์โทรศัพท์"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
            />
          </div>
          <div className="col-span-12 ">
            <Label required error={!!errors.email}>อีเมลล์</Label>
            <Input
              placeholder="อีเมลล์"
              {...register("email")}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>

          <div className="col-span-12 mt-6">
            <Label className="text-xl">รายละเอียดสิ่งของบริจาค</Label>
            <hr className="my-4" />

            {fields.map((f, idx) => (
              <div
                key={f.id}
                // กรอบแสดงเฉพาะจอเล็ก lg:hidden, จอใหญ่ไม่มี border
                className="mb-4 border rounded-md p-4 lg:border-0 lg:rounded-none lg:p-0"
              >
                {/* Header ของรายการ + ปุ่มลบบน Mobile */}
                <div className="flex items-center justify-between mb-4 lg:mb-0">
                  <Label className="text-xl">รายการที่ {idx + 1}</Label>

                  {/* ปุ่มลบ (มือถือเท่านั้น) */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="w-8 h-8 flex items-center justify-center 
              rounded-full bg-red-500 text-white 
              hover:bg-red-600 lg:hidden"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Desktop Layout - ใช้ flex แทน grid เพื่อควบคุมพื้นที่ได้ดีกว่า */}
                <div className="hidden lg:flex lg:gap-4">
                  {/* สิ่งของบริจาค */}
                  <div className="flex-[8]">
                    <Label required error={!!errors.donations?.[idx]?.item}>สิ่งของบริจาค</Label>
                    <Input
                      placeholder="เช่น ข้าวสาร/เครื่องดื่ม"
                      {...register(`donations.${idx}.item`)}
                    />
                  </div>

                  {/* จำนวน */}
                  <div className="flex-[2]">
                    <Label required error={!!errors.donations?.[idx]?.quantity}>จำนวน</Label>
                    <Input
                      type="number"
                      placeholder="กรอกจำนวน"
                      {...register(`donations.${idx}.quantity`)}
                      hint="เช่น ถ้ามี น้ำดื่ม 1 แพ็ค (12 ขวด)ให้กรอกเป็น 12"
                      error={!!errors.donations?.[idx]?.quantity}
                      errorMessage={errors.donations?.[idx]?.quantity?.message}
                    />
                  </div>

                  <div className="flex-[2]">
                    <Label required error={!!errors.donations?.[idx]?.price}>ราคา</Label>
                    <Input
                      type="number"
                      placeholder="กรอกราคาทั้งหมด"
                      {...register(`donations.${idx}.price`)}
                      error={!!errors.donations?.[idx]?.price}
                      errorMessage={errors.donations?.[idx]?.price?.message}
                    />
                  </div>

                  {/* ปุ่มลบบน Desktop - ชิดขวาสุด */}
                  {fields.length > 1 && (
                    <div className="flex flex-shrink-0 items-center">
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="w-9 h-9 flex items-center justify-center 
                rounded-full bg-red-500 text-white 
                hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Layout - ใช้ grid เหมือนเดิม */}
                <div className="grid grid-cols-12 gap-4 lg:hidden">
                  {/* สิ่งของบริจาค */}
                  <div className="col-span-12">
                    <Label required error={!!errors.donations?.[idx]?.item}>สิ่งของบริจาค</Label>
                    <Input
                      placeholder="เช่น ข้าวสาร/เครื่องดื่ม"
                      {...register(`donations.${idx}.item`)}
                    />
                  </div>

                  {/* จำนวน */}
                  <div className="col-span-12">
                    <Label required error={!!errors.donations?.[idx]?.quantity}>จำนวน</Label>
                    <Input
                      placeholder="กรอกจำนวน"
                      {...register(`donations.${idx}.quantity`)}
                      hint="เช่น ถ้ามี น้ำดื่ม 1 แพ็ค (12 ขวด) ให้กรอกเป็น 12"
                      error={!!errors.donations?.[idx]?.quantity}
                      errorMessage={errors.donations?.[idx]?.quantity?.message}
                    />
                  </div>

                  {/* ราคา */}
                  <div className="col-span-12">
                    <Label required error={!!errors.donations?.[idx]?.price}>ราคา</Label>
                    <Input
                      placeholder="กรอกราคา"
                      {...register(`donations.${idx}.price`)}
                      hint="กรอกราคาทั้งหมด"
                      error={!!errors.donations?.[idx]?.price}
                      errorMessage={errors.donations?.[idx]?.price?.message}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-12">
            <div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-green-600 text-green-600"
                onClick={() => append({ item: "", quantity: 0, price: 0 })}
              >
                + เพิ่มรายการ
              </Button>
            </div>
          </div>

          <div className="col-span-12">
            {control && <DropzoneInput control={control} name="files" />}
          </div>

          <div className="col-span-12 flex justify-end mt-4">
            <div className="space-x-4">
              <Button
                size="sm"
                className="!border-red-500 !text-red-500"
                type="submit"
                variant="outline"
              >
                ยกเลิก
              </Button>
              <Button size="sm" type="submit">
                บันทึก
              </Button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
