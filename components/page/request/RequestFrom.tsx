"use client";

import ComponentCard from "@/components/common/ComponentCard";
import DropzoneInput from "@/components/form/form-elements/DropZone";
import Input from "@/components/form/input/InputField";
import RadioGroup from "@/components/form/input/Radio";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation"; // ✅ ใช้ดึง params จาก URL

type RequestItem = {
  fullname: string;
  citizenId: string;
  province: string;
  district: string;
  subdistrict: string;
  damage: string;
  files: File[];
};

type FormValues = {
  requests: RequestItem[];
};

// ✅ ข้อมูลภัยพิบัติ
const disasters = [
  { id: "1", label: "น้ำท่วม" },
  { id: "2", label: "ไฟป่า" },
  { id: "3", label: "แผ่นดินไหว" },
  { id: "4", label: "พายุ" },
  { id: "5", label: "ภัยแล้ง" },
  { id: "6", label: "ดินถล่ม" },
  { id: "7", label: "สึนามิ" },
];

export default function RequestForm() {
  const { disastersId } = useParams(); // ✅ รับ param จาก URL เช่น 1, 2, 3
  const disaster = disasters.find((d) => d.id === disastersId); // หา label ของภัยพิบัติ

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      requests: [
        {
          fullname: "",
          citizenId: "",
          province: "",
          district: "",
          subdistrict: "",
          damage: "",
          files: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requests",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form array data:", data.requests);
  };

  return (
    <ComponentCard
      title={`แบบรายงานความเสียหาย${disaster ? `จาก${disaster.label}` : ""}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 "
      >
        <div className="max-h-[70vh] overflow-y-auto ">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`border mb-4 rounded-xl p-4 space-y-4 ${
                index % 2 === 0 ? "bg-white" : " bg-gray-50"
              }`}
            >
              {/* ปุ่มลบ */}
              {fields.length > 1 && (
                <div className="flex justify-between">
                  <div>
                    <span>รายชื่อที่ {index + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className=" w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
              {/* Fullname */}
              <Input
                type="text"
                placeholder="ชื่อ-สกุล"
                {...register(`requests.${index}.fullname`, {
                  required: "กรุณากรอกชื่อ-สกุล",
                })}
                error={!!errors.requests?.[index]?.fullname}
                errorMessage={errors.requests?.[index]?.fullname?.message}
              />

              {/* Citizen ID */}
              <Input
                type="text"
                placeholder="หมายเลขประจำตัวประชาชน"
                {...register(`requests.${index}.citizenId`, {
                  required: "กรุณากรอกเลขบัตรประชาชน",
                })}
                error={!!errors.requests?.[index]?.citizenId}
                errorMessage={errors.requests?.[index]?.citizenId?.message}
              />

              {/* Province */}
              <Select
                options={[
                  { value: "bangkok", label: "กรุงเทพมหานคร" },
                  { value: "chiangmai", label: "เชียงใหม่" },
                  { value: "khonkaen", label: "ขอนแก่น" },
                ]}
                placeholder="เลือกจังหวัด"
                register={register(`requests.${index}.province`, {
                  required: "กรุณาเลือกจังหวัด",
                })}
                error={!!errors.requests?.[index]?.province}
                errorMessage={errors.requests?.[index]?.province?.message}
              />

              {/* District + Subdistrict */}
              <div className="grid grid-cols-2 gap-4">
                <Select
                  options={[
                    { value: "muang", label: "อำเภอเมือง" },
                    { value: "sankamphaeng", label: "สันกำแพง" },
                    { value: "fang", label: "ฝาง" },
                  ]}
                  placeholder="เลือกอำเภอ"
                  register={register(`requests.${index}.district`, {
                    required: "กรุณาเลือกอำเภอ",
                  })}
                  error={!!errors.requests?.[index]?.district}
                  errorMessage={errors.requests?.[index]?.district?.message}
                />
                <Select
                  options={[
                    { value: "suthisan", label: "สุทธิสาร" },
                    { value: "changphueak", label: "ช้างเผือก" },
                    { value: "sanphisuea", label: "สันผีเสื้อ" },
                  ]}
                  placeholder="เลือกตำบล"
                  register={register(`requests.${index}.subdistrict`, {
                    required: "กรุณาเลือกตำบล",
                  })}
                  error={!!errors.requests?.[index]?.subdistrict}
                  errorMessage={errors.requests?.[index]?.subdistrict?.message}
                />
              </div>

              {/* Damage */}
              <RadioGroup
                options={[
                  { value: "whole", label: "เสียหายทั้งหลัง" },
                  { value: "minor", label: "เสียหายน้อย (น้อยกว่า 30%)" },
                  { value: "major", label: "เสียหายมาก (30-70%)" },
                ]}
                register={register(`requests.${index}.damage`, {
                  required: "กรุณาเลือกระดับความเสียหาย",
                })}
                error={!!errors.requests?.[index]?.damage}
                errorMessage={errors.requests?.[index]?.damage?.message}
              />

              {/* Files */}
              <DropzoneInput
                name={`requests.${index}.files`}
                control={control}
                rules={{ required: "กรุณาเลือกไฟล์" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {/* Add new form */}
          <Button
            className="border-green-600 text-green-600"
            size="sm"
            variant="outline"
            type="button"
            onClick={() =>
              append({
                fullname: "",
                citizenId: "",
                province: "",
                district: "",
                subdistrict: "",
                damage: "",
                files: [],
              })
            }
          >
            เพิ่มฟอร์มใหม่
          </Button>

          {/* Submit */}
          <div className=" space-x-4 ">
            <Button size="sm" type="submit" variant="outline">
              บันทึกร่าง
            </Button>
            <Button size="sm" type="submit">
              ส่งข้อมูล
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
