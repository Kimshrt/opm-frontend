"use client";

import ComponentCard from "@/components/common/ComponentCard";
import DropzoneInput from "@/components/form/form-elements/DropZone";
import Input from "@/components/form/input/InputField";
import RadioGroup from "@/components/form/input/Radio";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation"; // ✅ ใช้ดึง params จาก URL
import Label from "@/components/form/Label";
import { File } from "buffer";
import Checkbox from "@/components/form/input/Checkbox";
import DatePicker from "@/components/form/date-picker";
import TextArea from "@/components/form/input/TextArea";
import FileInput from "@/components/form/input/FileInput";
import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

type RequestItem = {
  name: string;
  surname: string;
  citizenId: string;
  province: string;
  district: string;
  subdistrict: string;
  damage: string;
  maritalStatus: string;
  religion: string;
  age: string;
  died: string;
  houseRegistration: string;
  currentAddress: string;
  familyMembers: string;
  assistance: string;
  income: string;
  career: string;
  beforeAfter: File[];
  citizenCard: File[];
  houseRegistrationFile: File[];
  dailyReport: File[];
  deathCertificate: File[];
  deathRecord: File[];
  marriageCertificate: File[];
  fireCauseReport: File[];
  constructionCostFile: File[];
  constructionCost: string;
};

type FormValues = {
  requests: RequestItem[];
  province: string;
  district: string;
  subdistrict: string;
  documentNumber1: string;
  documentNumber2: string;
  documentFile: File;
  agree: string;
  casualty: string;
  totalPaid: string;
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
          name: "",
          citizenId: "",
          province: "",
          district: "",
          subdistrict: "",
          damage: "",
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
      title={`แบบขอความช่วยเหลือจากเหตุ${disaster ? `${disaster.label}` : ""}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 "
      >
        {/*  */}
        <div>
          <Label>
            <span>
              เอกสารหนังสือการให้ความช่วยเหลือ จากกรมป้องกันและบรรเทาสาธารณภัย
            </span>
          </Label>
          {/* กรอก ปี/เลขหนังสือ */}
          <div className="flex items-center gap-2 justify-between lg:flex-row flex-col ">
            <div className="flex items-center gap-2 ">
              <Input
                type="text"
                placeholder="00000"
                {...register("documentNumber1", {
                  required: "กรุณากรอกเลขที่หนังสือ",
                })}
                error={!!errors.documentNumber1}
                errorMessage={errors.documentNumber1?.message}
                className="w-24"
              />
              <span>/</span>
              <Input
                type="text"
                placeholder="000000"
                {...register("documentNumber2", {
                  required: "กรุณากรอกเลขที่หนังสือ",
                })}
                error={!!errors.documentNumber2}
                errorMessage={errors.documentNumber2?.message}
                className="flex-1"
              />
            </div>

            {/* Upload file */}
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              {...register("documentFile", {
                required: "กรุณาอัปโหลดไฟล์",
              })}
              error={!!errors.documentFile}
              errorMessage={errors.documentFile?.message}
              className="flex-1 w-full"
            />
          </div>
        </div>
        {/*  */}
        <div>
          <Label>
            <span>เอกสารหนังสือจากจังหวัดในพื้นที่ประสบภัย</span>
          </Label>
          {/* กรอก ปี/เลขหนังสือ */}
          <div className="flex items-center gap-2 justify-between lg:flex-row flex-col ">
            <div className="flex items-center gap-2 ">
              <Input
                type="text"
                placeholder="00000"
                {...register("documentNumber1", {
                  required: "กรุณากรอกเลขที่หนังสือ",
                })}
                error={!!errors.documentNumber1}
                errorMessage={errors.documentNumber1?.message}
                className="w-24"
              />
              <span>/</span>
              <Input
                type="text"
                placeholder="000000"
                {...register("documentNumber2", {
                  required: "กรุณากรอกเลขที่หนังสือ",
                })}
                error={!!errors.documentNumber2}
                errorMessage={errors.documentNumber2?.message}
                className="flex-1"
              />
            </div>

            {/* Upload file */}
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              {...register("documentFile", {
                required: "กรุณาอัปโหลดไฟล์",
              })}
              error={!!errors.documentFile}
              errorMessage={errors.documentFile?.message}
              className="flex-1 w-full"
            />
          </div>
        </div>
        {/*  */}
        <div>
          <Label>
            <span>ประกาศเขตการให้ความช่วยเหลือ</span>
          </Label>
          {/* กรอก ปี/เลขหนังสือ */}
          <div className="flex items-center gap-2 justify-between lg:flex-row flex-col ">
            <div className="flex items-center gap-2 ">
              <Input
                type="text"
                placeholder="00000"
                {...register("documentNumber1", {
                  required: "กรุณากรอกเลขที่หนังสือ",
                })}
                error={!!errors.documentNumber1}
                errorMessage={errors.documentNumber1?.message}
                className="w-24"
              />
              <span>/</span>
              <Input
                type="text"
                placeholder="000000"
                {...register("documentNumber2", {
                  required: "กรุณากรอกเลขที่หนังสือ",
                })}
                error={!!errors.documentNumber2}
                errorMessage={errors.documentNumber2?.message}
                className="flex-1"
              />
            </div>

            {/* Upload file */}
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              {...register("documentFile", {
                required: "กรุณาอัปโหลดไฟล์",
              })}
              error={!!errors.documentFile}
              errorMessage={errors.documentFile?.message}
              className="flex-1 w-full"
            />
          </div>
        </div>

        {/*  */}
        <div>
          <Label>
            <span>เมื่อวันที่ (วว/ดด/ปป)</span>
          </Label>
          <DatePicker
            name="date"
            control={control}
            id="date"
            placeholder="เลือกวันที่"
          />
        </div>
        {/* District + Subdistrict */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>จังหวัด</Label>
            <Select
              options={[
                { value: "bangkok", label: "กรุงเทพมหานคร" },
                { value: "chiangmai", label: "เชียงใหม่" },
                { value: "khonkaen", label: "ขอนแก่น" },
              ]}
              placeholder="เลือกจังหวัด"
              register={register(`province`, {
                required: "กรุณาเลือกจังหวัด",
              })}
              error={!!errors.province}
              errorMessage={errors.province?.message}
            />
          </div>
          <div>
            <Label>อำเภอ</Label>
            <Select
              options={[
                { value: "muang", label: "อำเภอเมือง" },
                { value: "sankamphaeng", label: "สันกำแพง" },
                { value: "fang", label: "ฝาง" },
              ]}
              placeholder="เลือกอำเภอ"
              register={register(`district`, {
                required: "กรุณาเลือกอำเภอ",
              })}
              error={!!errors.district}
              errorMessage={errors.district?.message}
            />
          </div>
          <div>
            <Label>ตำบล</Label>
            <Select
              options={[
                { value: "suthisan", label: "สุทธิสาร" },
                { value: "changphueak", label: "ช้างเผือก" },
                { value: "sanphisuea", label: "สันผีเสื้อ" },
              ]}
              placeholder="เลือกตำบล"
              register={register(`subdistrict`, {
                required: "กรุณาเลือกตำบล",
              })}
              error={!!errors.subdistrict}
              errorMessage={errors.subdistrict?.message}
            />
          </div>
        </div>
        {/*  */}
        <div>
          <Label>
            <span>รายชื่อผู้ประสบภัยกรณี</span>
          </Label>
          <RadioGroup
            options={[
              { value: "เร่งด่วนจำเป็น", label: "เร่งด่วนจำเป็น" },
              { value: "เสียชีวิต", label: "เสียชีวิต" },
              { value: "บ้านเรือนเสียหาย", label: "บ้านเรือนเสียหาย" },
            ]}
            register={register(`casualty`)}
            error={!!errors.casualty}
            errorMessage={errors.casualty?.message}
          />
        </div>
        {/*  */}
        <hr />

        <div className="">
          {fields.map((field, index) => (
            <Disclosure
              key={field.id}
              as="div"
              className="mb-4 border rounded-xl "
            >
              {({ open }) => (
                <>
                  {/* Header */}
                  <Disclosure.Button
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors
        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      `}
                  >
                    <span className="font-medium text-gray-800">
                      ลำดับที่ {index + 1}
                    </span>

                    <div className="flex items-center gap-2">
                      {fields.length > 1 && (
                        <div
                          onClick={() => remove(index)}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                        >
                          ✕
                        </div>
                      )}
                      <FiChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </Disclosure.Button>
                  {open && (
                    <>
                      <hr />
                    </>
                  )}
                  {/* Content */}
                  <Disclosure.Panel
                    className={`p-4 space-y-4 transition-colors rounded-xl ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 lg:col-span-6">
                        <Label>ชื่อ</Label>
                        <Input
                          type="text"
                          placeholder="ชื่อ"
                          {...register(`requests.${index}.name`, {
                            required: "กรุณากรอกชื่อ",
                          })}
                          error={!!errors.requests?.[index]?.name}
                          errorMessage={errors.requests?.[index]?.name?.message}
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>นามสกุล</Label>
                        <Input
                          type="text"
                          placeholder="นามสกุล"
                          {...register(`requests.${index}.surname`, {
                            required: "กรุณากรอกนามสกุล",
                          })}
                          error={!!errors.requests?.[index]?.surname}
                          errorMessage={
                            errors.requests?.[index]?.surname?.message
                          }
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>เลขประจำตัวประชาชน</Label>
                        <Input
                          type="text"
                          placeholder="เลขประจำตัวประชาชน"
                          {...register(`requests.${index}.citizenId`)}
                          error={!!errors.requests?.[index]?.citizenId}
                          errorMessage={
                            errors.requests?.[index]?.citizenId?.message
                          }
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>สถานภาพ</Label>
                        <Select
                          options={[
                            { value: "โสด", label: "โสด" },
                            { value: "สมรส", label: "สมรส" },
                            { value: "หย่าร้าง", label: "หย่าร้าง" },
                            { value: "หม้าย", label: "หม้าย" },
                          ]}
                          placeholder="เลือกสถานภาพ"
                          register={register(`requests.${index}.maritalStatus`)}
                          error={!!errors.requests?.[index]?.maritalStatus}
                          errorMessage={
                            errors.requests?.[index]?.maritalStatus?.message
                          }
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>ศาสนา</Label>
                        <Select
                          options={[
                            { value: "พุทธ", label: "พุทธ" },
                            { value: "คริสต์", label: "คริสต์" },
                            { value: "อิสลาม", label: "อิสลาม" },
                            { value: "อื่นๆ", label: "อื่นๆ" },
                          ]}
                          placeholder="เลือกศาสนา"
                          register={register(`requests.${index}.religion`)}
                          error={!!errors.requests?.[index]?.religion}
                          errorMessage={
                            errors.requests?.[index]?.religion?.message
                          }
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>อายุ (ปี)</Label>
                        <Input
                          type="number"
                          placeholder="อายุ"
                          {...register(`requests.${index}.age`, {
                            required: "อายุ",
                          })}
                          error={!!errors.requests?.[index]?.age}
                          errorMessage={errors.requests?.[index]?.age?.message}
                        />
                      </div>
                      <div className="col-span-12">
                        <Label>สาเหตุและวันที่เสียชีวิต</Label>
                        <TextArea
                          placeholder="กรอกสาเหตุและวันที่เสียชีวิต"
                          rows={4}
                          register={register(`requests.${index}.died`)}
                          error={!!errors.requests?.[index]?.died}
                          hint={errors.requests?.[index]?.died?.message}
                        />
                      </div>
                      <div className="col-span-12">
                        <Label>ที่อยู่ตามทะเบียนบ้าน</Label>
                        <TextArea
                          placeholder="กรอกที่อยู่ตามทะเบียนบ้าน"
                          rows={4}
                          register={register(
                            `requests.${index}.houseRegistration`
                          )}
                          error={!!errors.requests?.[index]?.houseRegistration}
                          hint={
                            errors.requests?.[index]?.houseRegistration?.message
                          }
                        />
                      </div>
                      <div className="col-span-12">
                        <Label>ที่อยู่ปัจจุบัน</Label>
                        <TextArea
                          placeholder="กรอกที่อยู่ปัจจุบัน"
                          rows={4}
                          register={register(
                            `requests.${index}.currentAddress`
                          )}
                          error={!!errors.requests?.[index]?.currentAddress}
                          hint={
                            errors.requests?.[index]?.currentAddress?.message
                          }
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>อาชีพ</Label>
                        <Input
                          type="text"
                          placeholder="กรอกอาชีพ"
                          {...register(`requests.${index}.career`)}
                          error={!!errors.requests?.[index]?.career}
                          errorMessage={
                            errors.requests?.[index]?.career?.message
                          }
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <Label>รายได้ต่อเดือน (บาท)</Label>
                        <Input
                          type="text"
                          placeholder="กรอกรายได้ต่อเดือน"
                          {...register(`requests.${index}.income`)}
                          error={!!errors.requests?.[index]?.income}
                          errorMessage={
                            errors.requests?.[index]?.income?.message
                          }
                        />
                      </div>
                      <div className="col-span-12">
                        <Label>
                          รายละเอียดของบุคคลในครอบครัว, หมายเลขโทรศัพท์ติดต่อ
                        </Label>
                        <TextArea
                          placeholder="กรอกรายละเอียดของบุคคลในครอบครัว"
                          rows={4}
                          register={register(`requests.${index}.familyMembers`)}
                          error={!!errors.requests?.[index]?.familyMembers}
                          hint={
                            errors.requests?.[index]?.familyMembers?.message
                          }
                        />
                      </div>
                      <div className="col-span-12">
                        <Label>การให้ความช่วยเหลือจากหน่วยงานต่างๆ</Label>
                        <TextArea
                          placeholder="กรอกรายละเอียดการให้ความช่วยเหลือจากหน่วยงานต่างๆ"
                          rows={4}
                          register={register(`requests.${index}.assistance`)}
                          error={!!errors.requests?.[index]?.assistance}
                          hint={errors.requests?.[index]?.assistance?.message}
                        />
                      </div>
                      {/* ภาพถ่ายก่อน/หลัง */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>ภาพถ่ายเหตุการณ์ก่อน/หลัง (ถ้ามี)</Label>
                        <FileInput
                          register={register(`requests.${index}.beforeAfter`, {
                            required: "กรุณาอัปโหลดไฟล์",
                          })}
                          error={!!errors.requests?.[index]?.beforeAfter}
                          errorMessage={
                            errors.requests?.[index]?.beforeAfter?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>

                      {/* สำเนาทะเบียนบ้าน */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>สำเนาทะเบียนบ้าน</Label>
                        <FileInput
                          register={register(
                            `requests.${index}.houseRegistrationFile`,
                            {
                              required: "กรุณาอัปโหลดไฟล์",
                            }
                          )}
                          error={
                            !!errors.requests?.[index]?.houseRegistrationFile
                          }
                          errorMessage={
                            errors.requests?.[index]?.houseRegistrationFile
                              ?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>

                      {/* สำเนาบัตรประจำตัวประชาชน */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>สำเนาบัตรประจำตัวประชาชน</Label>
                        <FileInput
                          register={register(`requests.${index}.citizenCard`, {
                            required: "กรุณาอัปโหลดไฟล์",
                          })}
                          error={!!errors.requests?.[index]?.citizenCard}
                          errorMessage={
                            errors.requests?.[index]?.citizenCard?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>

                      {/* บันทึกประจำวัน */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>บันทึกประจำวัน</Label>
                        <FileInput
                          register={register(`requests.${index}.dailyReport`, {
                            required: "กรุณาอัปโหลดไฟล์",
                          })}
                          error={!!errors.requests?.[index]?.dailyReport}
                          errorMessage={
                            errors.requests?.[index]?.dailyReport?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>

                      {/* หนังสือรับรองการตาย */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>หนังสือรับรองการตาย</Label>
                        <FileInput
                          register={register(
                            `requests.${index}.deathCertificate`,
                            {
                              required: "กรุณาอัปโหลดไฟล์",
                            }
                          )}
                          error={!!errors.requests?.[index]?.deathCertificate}
                          errorMessage={
                            errors.requests?.[index]?.deathCertificate?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>

                      {/* มรณบัตร */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>มรณบัตร</Label>
                        <FileInput
                          register={register(`requests.${index}.deathRecord`, {
                            required: "กรุณาอัปโหลดไฟล์",
                          })}
                          error={!!errors.requests?.[index]?.deathRecord}
                          errorMessage={
                            errors.requests?.[index]?.deathRecord?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>

                      {/* ใบสำคัญการสมรส (ถ้ามี) */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>ใบสำคัญการสมรส (ถ้ามี)</Label>
                        <FileInput
                          register={register(
                            `requests.${index}.marriageCertificate`
                          )}
                          error={
                            !!errors.requests?.[index]?.marriageCertificate
                          }
                          errorMessage={
                            errors.requests?.[index]?.marriageCertificate
                              ?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>
                      {/* รายการประเมินราคาจากสำนักงานโยธาธิการและผังเมืองจังหวัด */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>
                          กรอกค่าก่อสร้างทั้งหมด/รายการประเมินราคาจากสำนักงานโยธาธิการและผังเมืองจังหวัด
                        </Label>
                        <div className="flex gap-4">
                          <Input
                            type="text"
                            placeholder="กรอกรวมค่าก่อสร้าง"
                            {...register(`requests.${index}.constructionCost`)}
                            error={!!errors.requests?.[index]?.constructionCost}
                            errorMessage={
                              errors.requests?.[index]?.constructionCost
                                ?.message
                            }
                          />
                          <FileInput
                            register={register(
                              `requests.${index}.constructionCostFile`
                            )}
                            error={
                              !!errors.requests?.[index]?.constructionCostFile
                            }
                            errorMessage={
                              errors.requests?.[index]?.constructionCostFile
                                ?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>
                      </div>

                      {/* กรณีเพลิงไหม้บ้าน (ผลสาเหตุเพลิงไหม้จากตำรวจ) */}
                      <div className="col-span-12 lg:col-span-6">
                        <Label>
                          กรณีเพลิงไหม้บ้าน
                          (ขอผลสาเหตุการเกิดเพลิงไหม้จากการสอบสวนของเจ้าพนักงานตำรวจ)
                        </Label>
                        <FileInput
                          register={register(
                            `requests.${index}.fireCauseReport`
                          )}
                          error={!!errors.requests?.[index]?.fireCauseReport}
                          errorMessage={
                            errors.requests?.[index]?.fireCauseReport?.message
                          }
                          hint="รองรับไฟล์ .pdf, .jpg, .png"
                        />
                      </div>
                    </div>

                    <Label>ความเสียหาย</Label>
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
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        {/* Add new form */}
        <Button
          className="border-green-600 text-green-600"
          size="sm"
          variant="outline"
          type="button"
          onClick={() =>
            append({
              name: "",
              surname: "",
              citizenId: "",
              province: "",
              district: "",
              subdistrict: "",
              damage: "",
              maritalStatus: "",
              religion: "",
              age: "",
              died: "",
              houseRegistration: "",
              currentAddress: "",
              familyMembers: "",
              assistance: "",
              income: "",
              career: "",
              beforeAfter: [],
              citizenCard: [],
              houseRegistrationFile: [],
              dailyReport: [],
              deathCertificate: [],
              deathRecord: [],
              marriageCertificate: [],
              fireCauseReport: [],
              constructionCostFile: [],
              constructionCost: "",
            })
          }
        >
          เพิ่มฟอร์มใหม่
        </Button>
        <hr />
        <Label>รวมทั้งสิ้น (บาท)</Label>
        <Input
          type="text"
          placeholder="จำนวนเงินทั้งหมด"
          {...register(`totalPaid`)}
          error={!!errors.totalPaid}
          errorMessage={errors.totalPaid?.message}
        />
        <div className="flex justify-end">
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
