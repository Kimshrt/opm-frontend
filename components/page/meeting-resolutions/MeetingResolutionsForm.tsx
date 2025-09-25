"use client";
import React from "react";
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

type FormValues = {
  meetingTime: string;
  meetingDate: string;
  meetingPlace: string;
  subject: string;
  disaster: string;
  province: string;
  householdsAffected: string;
  utilities: string;
  reasonsConsiderationOutsideCriteria: string;
  proceed: string;
  assistance: { type: string; budget: number; detail: string }[];
};

const schema = yup.object({
  meetingTime: yup.string().required("กรุณากรอกเวลา"),
  meetingDate: yup.string().required("กรุณากรอกวันที่"),
  meetingPlace: yup.string().required("กรุณากรอกสถานที่ประชุม"),
  subject: yup.string().required("กรุณากรอกเรื่อง"),
  disaster: yup.string().required("กรุณากรอกประเภทภัยพิบัติ"),
  province: yup.string().required("กรุณากรอกจังหวัด"),
  householdsAffected: yup.string().default(""), // ✅ ไม่บังคับ
  utilities: yup.string().default(""),          // ✅ ไม่บังคับ
  reasonsConsiderationOutsideCriteria: yup
    .string()
    .required("กรุณากรอกเหตุผลการพิจารณานอกเกณฑ์"),
  proceed: yup.string().required("กรุณากรอกวิธีดำเนินการ"),

  assistance: yup
    .array()
    .of(
      yup.object({
        type: yup.string().required("กรุณากรอกประเภทช่วยเหลือ"),
        detail: yup.string().required("กรุณากรอกรายละเอียด"),
        budget: yup
          .number()
          .typeError("งบประมาณต้องเป็นตัวเลข")
          .required("กรุณากรอกงบประมาณ")
          .min(1, "งบประมาณต้องมากกว่า 0"),
      })
    )
    .min(1, "ต้องมีรายการช่วยเหลืออย่างน้อย 1 รายการ")
    .required("ต้องมีรายการช่วยเหลืออย่างน้อย 1 รายการ"),
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
      assistance: [{ type: "", budget: 0, detail: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "assistance",
    control,
  });
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div>
      <ComponentCard title="สร้างวาระ/มติการประชุม">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4 "
        >
          <div className="col-span-12 md:col-span-4">
            <Label required error={!!errors.meetingPlace}>ครั้งที่ประชุม</Label>
            <Input
              placeholder="ครั้งที่ประชุม"
              {...register("meetingTime")}
              error={!!errors.meetingTime}
              errorMessage={errors.meetingTime?.message}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Label>วันที่ประชุม</Label>
            <DatePicker
              name="meetingDate"
              control={control}
              id="meetingDate"
              placeholder="เลือกวันที่"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Label>สถานที่ประชุม</Label>
            <Input
              placeholder="สถานที่ประชุม"
              {...register("meetingPlace")}
              error={!!errors.meetingPlace}
              errorMessage={errors.meetingPlace?.message}
            />
          </div>
          <div className="col-span-12 ">
            <Label>เรื่อง</Label>
            <Input
              placeholder="เรื่อง"
              {...register("subject")}
              error={!!errors.subject}
              errorMessage={errors.subject?.message}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>ประเภทสาธารณภัย</Label>
            <Input
              placeholder="ประเภทสาธารณภัย"
              {...register("disaster")}
              error={!!errors.disaster}
              errorMessage={errors.disaster?.message}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>จังหวัดที่ได้รับผลกระทบ</Label>
            <Select
              options={[
                { value: "sasdasd", label: "asdasd" },
                { value: "chiangmai", label: "เชียงใหม่" },
                { value: "khonkaen", label: "ขอนแก่น" },
              ]}
              placeholder="เลือกจังหวัด"
              register={register("province")}
              error={!!errors.province}
              errorMessage={errors.province?.message}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>จำนวนครัวเรือนที่ได้รับผลกระทบ (ประมาณ)</Label>
            <Input
              placeholder="จำนวนครัวเรือน"
              {...register("householdsAffected")}
              error={!!errors.householdsAffected}
              errorMessage={errors.householdsAffected?.message}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Label>สาธารณูปโภค/ทรัพย์สินสาธารณะเสียหาย (ถ้ามี)</Label>
            <Input
              placeholder="สาธารณูปโภค/ทรัพย์สินสาธารณะเสียหาย"
              {...register("utilities")}
              error={!!errors.utilities}
              errorMessage={errors.utilities?.message}
            />
          </div>
          <div className="col-span-12">
            <Label>เหตุผลที่ขอพิจารณานอกหลักเกณฑ์</Label>
            <TextArea
              placeholder="กรอกสาเหตุและวันที่เสียชีวิต"
              rows={4}
              register={register("reasonsConsiderationOutsideCriteria")}
              error={!!errors.reasonsConsiderationOutsideCriteria}
              hint={errors.reasonsConsiderationOutsideCriteria?.message}
            />
          </div>
          <div className="col-span-12 ">
            <Label>วิธีดำเนินการ/กลไกควบคุม/การติดตาม</Label>
            <TextArea
              placeholder="กรอกสาเหตุและวันที่เสียชีวิต"
              rows={4}
              register={register("proceed")}
              error={!!errors.proceed}
              hint={errors.proceed?.message}
            />
          </div>
          <div className="col-span-12 ">
            <Label className="text-xl">รายละเอียดการช่วยเหลือ</Label>
            <hr className="my-4" />
            {fields.map((f, idx) => (
              <div key={f.id} className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12">
                  <Label className="text-xl">รายการที่ {idx + 1}</Label>
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <Label>ประเภทช่วยเหลือ</Label>
                  <Input
                    placeholder="เช่น เงินสงเคราะห์/สิ่งของ/ซ่อมแซม"
                    {...register(`assistance.${idx}.type`)}
                  />
                </div>

                <div className="col-span-12 lg:col-span-4">
                  <Label>รายละเอียด</Label>
                  <Input
                    placeholder="เช่น เงินช่วยเหลือเร่งด่วนครัวเรือนละ … บาท"
                    {...register(`assistance.${idx}.detail`)}
                  />
                </div>

                {/* งบประมาณ + ปุ่มลบ */}
                <div className="col-span-12 lg:col-span-4 flex items-center gap-2">
                  <div className="flex-1">
                    <Label>งบประมาณ (บาท)</Label>
                    <Input
                      type="number"
                      className="input"
                      {...register(`assistance.${idx}.budget`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="w-8 h-8 flex items-center justify-center 
                     rounded-full bg-red-500 text-white 
                     hover:bg-red-600 mt-6"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 flex justify-between mt-4">
            <div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-green-600 text-green-600"
                onClick={() => append({ type: "", detail: "", budget: 0 })}
              >
                + เพิ่มรายการ
              </Button>
            </div>
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
                อนุมัติ
              </Button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </div>
  );
}
