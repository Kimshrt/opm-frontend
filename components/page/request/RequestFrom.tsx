"use client";
import ComponentCard from "@/components/common/ComponentCard";
import DropzoneInput from "@/components/form/input/DropZone";
import Input from "@/components/form/input/InputField";
import RadioGroup from "@/components/form/input/Radio";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation"; // ✅ ใช้ดึง params จาก URL
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import DatePicker from "@/components/form/date-picker";
import TextArea from "@/components/form/input/TextArea";
import FileInput from "@/components/form/input/FileInput";
import { Disclosure } from "@headlessui/react";
import { FiChevronDown, FiEdit2 } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "@/type/requestType";
import { useState } from "react";

type RequestFormProps = {
  page?: "edit" | "view";
  id?: string;
  disastersId?: string;
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
const schema = yup.object().shape({
  documentHelp1: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) => s.required("กรุณากรอกข้อมูลเอกสารช่วยเหลือ"),
      otherwise: (s) => s.notRequired(),
    }),

  documentHelp2: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) => s.required("กรุณากรอกข้อมูลเอกสารช่วยเหลือ"),
      otherwise: (s) => s.notRequired(),
    }),

  documentFileHelp: yup
    .mixed<File[]>()
    .default([])
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) =>
        s.test(
          "required",
          "กรุณาอัปโหลดไฟล์เอกสารช่วยเหลือ",
          (value) => value && value.length > 0
        ),
      otherwise: (s) => s.notRequired(),
    }),

  documentAffectedProvince1: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) => s.required("กรุณากรอกข้อมูลจังหวัดประสบภัย"),
      otherwise: (s) => s.notRequired(),
    }),

  documentAffectedProvince2: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) => s.required("กรุณากรอกข้อมูลจังหวัดประสบภัย"),
      otherwise: (s) => s.notRequired(),
    }),

  documentAffectedProvincesFile: yup
    .mixed<File[]>()
    .default([])
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) =>
        s.test(
          "required",
          "กรุณาอัปโหลดไฟล์จังหวัดประสบภัย",
          (value) => value && value.length > 0
        ),
      otherwise: (s) => s.notRequired(),
    }),

  documentAssistanceArea1: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) => s.required("กรุณากรอกข้อมูลประกาศเขตการช่วยเหลือ"),
      otherwise: (s) => s.notRequired(),
    }),

  documentAssistanceArea2: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) => s.required("กรุณากรอกข้อมูลประกาศเขตการช่วยเหลือ"),
      otherwise: (s) => s.notRequired(),
    }),

  documentAssistanceAreaFile: yup
    .mixed<File[]>()
    .default([])
    .when("criteria", {
      is: (val: string) => !val || val === "ตามหลักเกณฑ์",
      then: (s) =>
        s.test(
          "required",
          "กรุณาอัปโหลดไฟล์ประกาศเขตการช่วยเหลือ",
          (value) => value && value.length > 0
        ),
      otherwise: (s) => s.notRequired(),
    }),
  date: yup.string().required("กรุณาเลือกวันที่"),
  province: yup.string().required("กรุณาเลือกจังหวัด"),
  district: yup.string().required("กรุณาเลือกอำเภอ"),
  subdistrict: yup.string().required("กรุณาเลือกตำบล"),
  casualty: yup.string().required("กรุณาเลือกประเภทผู้ประสบภัย"),
  totalPaid: yup.string().required("กรุณาจำนวนเงินทั้งหมด"),
  criteria: yup
    .string()
    .default("ตามหลักเกณฑ์")
    .when("$page", {
      is: "view",
      then: (s) => s.required("กรุณากรอกหลักเกณฑ์"),
    }),
  meetingResolutions: yup
    .string()
    .default("")
    .when("criteria", {
      is: (val: string) => val === "นอกเหนือหลักเกณฑ์",
      then: (s) => s.required("กรุณาเลือกมติการประชุม"),
      otherwise: (s) => s.notRequired(),
    }),
  requests: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("กรุณากรอกชื่อ"),
        surname: yup.string().required("กรุณากรอกนามสกุล"),
        citizenId: yup
          .string()
          .required("กรุณากรอกเลขประจำตัวประชาชน")
          .matches(/^[0-9]{13}$/, "เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก"),
        maritalStatus: yup.string().required("กรุณาเลือกสถานภาพ"),
        religion: yup.string().required("กรุณาเลือกศาสนา"),
        age: yup
          .number()
          .typeError("กรุณากรอกอายุเป็นตัวเลข")
          .positive("อายุต้องมากกว่า 0")
          .integer("อายุต้องเป็นจำนวนเต็ม")
          .required("กรุณากรอกอายุ"),
        died: yup.string().required("กรุณากรอกสาเหตุและวันที่เสียชีวิต"),
        houseRegistration: yup.string().required("กรอกที่อยู่ตามทะเบียนบ้าน"),
        currentAddress: yup.string().required("กรอกที่อยู่ปัจจุบัน"),
        career: yup.string().required("กรุณากรอกอาชีพ"),
        income: yup
          .string()
          .matches(/^[0-9]*$/, "รายได้ต้องเป็นตัวเลข")
          .required("กรุณากรอกรายได้ต่อเดือน"),

        familyMembers: yup.string().default(""),
        assistance: yup.string().default(""),

        beforeAfter: yup.mixed<File[]>().default([]),
        houseRegistrationFile: yup
          .mixed<File[]>()
          .default([])
          .test(
            "required",
            "กรุณาอัปโหลดสำเนาทะเบียนบ้าน",
            (v) => v && v.length > 0
          ),
        citizenCard: yup
          .mixed<File[]>()
          .default([])
          .test(
            "required",
            "กรุณาอัปโหลดสำเนาบัตรประชาชน",
            (v) => v && v.length > 0
          ),
        dailyReport: yup
          .mixed<File[]>()
          .default([])
          .test(
            "required",
            "กรุณาอัปโหลดบันทึกประจำวัน",
            (v) => v && v.length > 0
          ),
        deathCertificate: yup
          .mixed<File[]>()
          .default([])
          .test(
            "required",
            "กรุณาอัปโหลดหนังสือรับรองการตาย",
            (v) => v && v.length > 0
          ),
        deathRecord: yup
          .mixed<File[]>()
          .default([])
          .test("required", "กรุณาอัปโหลดมรณบัตร", (v) => v && v.length > 0),
        marriageCertificate: yup.mixed<File[]>().default([]), // optional
        constructionCost: yup.string().required("กรุณากรอกค่าก่อสร้างทั้งหมด"),
        constructionCostFile: yup
          .mixed<File[]>()
          .default([])
          .test(
            "required",
            "กรุณาอัปโหลดไฟล์ค่าก่อสร้าง",
            (v) => v && v.length > 0
          ),
        fireCauseReport: yup
          .mixed<File[]>()
          .default([])
          .test(
            "required",
            "กรุณาอัปโหลดผลสาเหตุเพลิงไหม้",
            (v) => v && v.length > 0
          ),

        damage: yup.string().required("กรุณาเลือกระดับความเสียหาย"),
      })
    )
    .default([]),
});

export default function RequestForm({
  page = "edit",
  id,
  disastersId,
}: RequestFormProps) {
  const disaster = disasters.find((d) => d.id === disastersId); // หา label ของภัยพิบัติ
  const [isLocked, setIsLocked] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema, { context: { page } }),
    context: { page },
    defaultValues: {
      criteria:"ตามหลักเกณฑ์",
      requests: [
        {
          name: "",
          surname: "",
          citizenId: "",
          damage: "",
          maritalStatus: "",
          religion: "",
          age: 0,
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
        },
      ],
    },
  });
  const criteria = watch("criteria");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requests",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form array data:", data);
  };

  return (
    <ComponentCard
      title={`แบบขอความช่วยเหลือจากเหตุ${disaster ? `${disaster.label}` : ""}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 "
      >
        {criteria === "นอกเหนือหลักเกณฑ์" ? (
          <>
            {/*  */}
            <div>
              <Label
                className={`font-medium ${
                  errors.meetingResolutions ? "text-red-500" : "text-gray-700"
                }`}
              >
                วาระ/มติการประชุม
                <span className="text-red-500"> *</span>
              </Label>

              {/* กรอก ปี/เลขหนังสือ */}
              <div className="w-full lg:w-1/2">
                <Select
                  options={[
                    { value: "002", label: "วาระ/มติการประชุม ที่ 1 " },
                    { value: "001", label: "วาระ/มติการประชุม ที่ 2 " },
                    { value: "003", label: "วาระ/มติการประชุม ที่ 3 " },
                  ]}
                  placeholder="เลือกวาระ/มติการประชุม"
                  disabled={page === "view"}
                  register={register("meetingResolutions")}
                  error={!!errors.meetingResolutions}
                  errorMessage={errors.meetingResolutions?.message}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/*  */}
            <div>
              <Label
                className={`font-medium ${
                  errors.documentHelp1 ||
                  errors.documentHelp2 ||
                  errors.documentFileHelp
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
              >
                เอกสารหนังสือการให้ความช่วยเหลือ จากกรมป้องกันและบรรเทาสาธารณภัย
                <span className="text-red-500"> *</span>
              </Label>

              {/* กรอก ปี/เลขหนังสือ */}
              <div className="flex items-center gap-2 justify-between lg:flex-row flex-col ">
                <div className="flex items-center gap-2 ">
                  <Input
                    type="text"
                    disabled={page === "view"}
                    placeholder="00000"
                    {...register("documentHelp1")}
                    error={!!errors.documentHelp1}
                    errorMessage={errors.documentHelp1?.message}
                    className="w-24"
                  />
                  <span className="text-xl">/</span>
                  <Input
                    type="text"
                    placeholder="000000"
                    disabled={page === "view"}
                    {...register("documentHelp2")}
                    error={!!errors.documentHelp2}
                    errorMessage={errors.documentHelp2?.message}
                    className="flex-1"
                  />
                </div>

                {/* Upload file */}
                <FileInput
                  disabled={page === "view"}
                  register={register("documentFileHelp")}
                  error={!!errors.documentFileHelp}
                  errorMessage={errors.documentFileHelp?.message}
                  className="flex-1 w-full"
                />
              </div>
            </div>
            {/*  */}
            <div>
              <Label
                className={`font-medium ${
                  errors.documentAffectedProvince1 ||
                  errors.documentAffectedProvince2 ||
                  errors.documentAffectedProvincesFile
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
              >
                เอกสารหนังสือจากจังหวัดในพื้นที่ประสบภัย
                <span className="text-red-500"> *</span>
              </Label>
              {/* กรอก ปี/เลขหนังสือ */}
              <div className="flex items-center gap-2 justify-between lg:flex-row flex-col ">
                <div className="flex items-center gap-2 ">
                  <Input
                    type="text"
                    placeholder="00000"
                    disabled={page === "view"}
                    {...register("documentAffectedProvince1")}
                    error={!!errors.documentAffectedProvince1}
                    errorMessage={errors.documentAffectedProvince1?.message}
                    className="w-24"
                  />
                  <span className="text-xl">/</span>
                  <Input
                    type="text"
                    placeholder="000000"
                    disabled={page === "view"}
                    {...register("documentAffectedProvince2")}
                    error={!!errors.documentAffectedProvince2}
                    errorMessage={errors.documentAffectedProvince2?.message}
                    className="flex-1"
                  />
                </div>

                {/* Upload file */}
                <FileInput
                  disabled={page === "view"}
                  register={register("documentAffectedProvincesFile")}
                  error={!!errors.documentAffectedProvincesFile}
                  errorMessage={errors.documentAffectedProvincesFile?.message}
                  className="flex-1 w-full"
                />
              </div>
            </div>
            {/*  */}
            <div>
              <Label
                className={`font-medium ${
                  errors.documentAssistanceArea1 ||
                  errors.documentAssistanceArea2 ||
                  errors.documentAssistanceAreaFile
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
              >
                ประกาศเขตการให้ความช่วยเหลือ
                <span className="text-red-500"> *</span>
              </Label>
              {/* กรอก ปี/เลขหนังสือ */}
              <div className="flex items-center gap-2 justify-between lg:flex-row flex-col ">
                <div className="flex items-center gap-2 ">
                  <Input
                    type="text"
                    disabled={page === "view"}
                    placeholder="00000"
                    {...register("documentAssistanceArea1")}
                    error={!!errors.documentAssistanceArea1}
                    errorMessage={errors.documentAssistanceArea1?.message}
                    className="w-24"
                  />
                  <span className="text-xl">/</span>
                  <Input
                    type="text"
                    disabled={page === "view"}
                    placeholder="000000"
                    {...register("documentAssistanceArea2")}
                    error={!!errors.documentAssistanceArea2}
                    errorMessage={errors.documentAssistanceArea2?.message}
                    className="flex-1"
                  />
                </div>

                {/* Upload file */}
                <FileInput
                  disabled={page === "view"}
                  register={register("documentAssistanceAreaFile")}
                  error={!!errors.documentAssistanceAreaFile}
                  errorMessage={errors.documentAssistanceAreaFile?.message}
                  className="flex-1 w-full"
                />
              </div>
            </div>
          </>
        )}

        {/*  */}
        <div>
          <Label
            className={`font-medium ${
              errors.date ? "text-red-500" : "text-gray-700"
            }`}
          >
            เมื่อวันที่ (วว/ดด/ปป) <span className="text-red-500">*</span>
          </Label>
          <DatePicker
            name="date"
            disabled={page === "view"}
            control={control}
            id="date"
            placeholder="เลือกวันที่"
          />
        </div>
        {/* จ.อ.ต.*/}
        <div className="grid grid-cols-3 gap-4">
          {/* จังหวัด */}
          <div>
            <Label
              className={`font-medium ${
                errors.province ? "text-red-500" : "text-gray-700"
              }`}
            >
              จังหวัด <span className="text-red-500">*</span>
            </Label>
            <Select
              options={[
                { value: "", label: "" },
                { value: "chiangmai", label: "เชียงใหม่" },
                { value: "khonkaen", label: "ขอนแก่น" },
              ]}
              placeholder="เลือกจังหวัด"
              disabled={page === "view"}
              register={register("province")}
              error={!!errors.province}
              errorMessage={errors.province?.message}
            />
          </div>

          {/* อำเภอ */}
          <div>
            <Label
              className={`font-medium ${
                errors.district ? "text-red-500" : "text-gray-700"
              }`}
            >
              อำเภอ <span className="text-red-500">*</span>
            </Label>
            <Select
              options={[
                { value: "", label: "" },
                { value: "sankamphaeng", label: "สันกำแพง" },
                { value: "fang", label: "ฝาง" },
              ]}
              disabled={page === "view"}
              placeholder="เลือกอำเภอ"
              register={register("district")}
              error={!!errors.district}
              errorMessage={errors.district?.message}
            />
          </div>

          {/* ตำบล */}
          <div>
            <Label
              className={`font-medium ${
                errors.subdistrict ? "text-red-500" : "text-gray-700"
              }`}
            >
              ตำบล <span className="text-red-500">*</span>
            </Label>
            <Select
              options={[
                { value: "", label: "" },
                { value: "changphueak", label: "ช้างเผือก" },
                { value: "sanphisuea", label: "สันผีเสื้อ" },
              ]}
              disabled={page === "view"}
              placeholder="เลือกตำบล"
              register={register("subdistrict")}
              error={!!errors.subdistrict}
              errorMessage={errors.subdistrict?.message}
            />
          </div>
        </div>
        {/* รายชื่อผู้ประสบภัยกรณี */}
        <div>
          <Label
            className={`font-medium ${
              errors.casualty ? "text-red-500" : "text-gray-700"
            }`}
          >
            รายชื่อผู้ประสบภัยกรณี <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            options={[
              { value: "เร่งด่วนจำเป็น", label: "เร่งด่วนจำเป็น" },
              { value: "เสียชีวิต", label: "เสียชีวิต" },
              { value: "บ้านเรือนเสียหาย", label: "บ้านเรือนเสียหาย" },
            ]}
            disabled={page === "view"}
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
              {({ open }) => {
                const hasError =
                  errors.requests?.[index] &&
                  Object.keys(errors.requests[index]).length > 0;
                return (
                  <>
                    {/* Header */}
                    <Disclosure.Button
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors
        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      `}
                    >
                      <span
                        className={`font-medium ${
                          hasError ? "text-red-500" : "text-gray-800"
                        }`}
                      >
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
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.name
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            ชื่อ <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            placeholder="ชื่อ"
                            disabled={page === "view"}
                            {...register(`requests.${index}.name`)}
                            error={!!errors.requests?.[index]?.name}
                            errorMessage={
                              errors.requests?.[index]?.name?.message
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.surname
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            นามสกุล <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            placeholder="นามสกุล"
                            disabled={page === "view"}
                            {...register(`requests.${index}.surname`)}
                            error={!!errors.requests?.[index]?.surname}
                            errorMessage={
                              errors.requests?.[index]?.surname?.message
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.citizenId
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            เลขประจำตัวประชาชน
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            placeholder="เลขประจำตัวประชาชน"
                            disabled={page === "view"}
                            {...register(`requests.${index}.citizenId`)}
                            error={!!errors.requests?.[index]?.citizenId}
                            errorMessage={
                              errors.requests?.[index]?.citizenId?.message
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.maritalStatus
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            สถานภาพ <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            options={[
                              { value: "โสด", label: "โสด" },
                              { value: "สมรส", label: "สมรส" },
                              { value: "หย่าร้าง", label: "หย่าร้าง" },
                              { value: "หม้าย", label: "หม้าย" },
                            ]}
                            placeholder="เลือกสถานภาพ"
                            register={register(
                              `requests.${index}.maritalStatus`
                            )}
                            disabled={page === "view"}
                            error={!!errors.requests?.[index]?.maritalStatus}
                            errorMessage={
                              errors.requests?.[index]?.maritalStatus?.message
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.religion
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            ศาสนา <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            options={[
                              { value: "พุทธ", label: "พุทธ" },
                              { value: "คริสต์", label: "คริสต์" },
                              { value: "อิสลาม", label: "อิสลาม" },
                              { value: "อื่นๆ", label: "อื่นๆ" },
                            ]}
                            disabled={page === "view"}
                            placeholder="เลือกศาสนา"
                            register={register(`requests.${index}.religion`)}
                            error={!!errors.requests?.[index]?.religion}
                            errorMessage={
                              errors.requests?.[index]?.religion?.message
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.age
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            อายุ (ปี) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="number"
                            placeholder="อายุ"
                            disabled={page === "view"}
                            {...register(`requests.${index}.age`)}
                            error={!!errors.requests?.[index]?.age}
                            errorMessage={
                              errors.requests?.[index]?.age?.message
                            }
                          />
                        </div>
                        <div className="col-span-12">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.died
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            สาเหตุและวันที่เสียชีวิต{" "}
                            <span className="text-red-500">*</span>
                          </Label>

                          <TextArea
                            placeholder="กรอกสาเหตุและวันที่เสียชีวิต"
                            rows={4}
                            disabled={page === "view"}
                            register={register(`requests.${index}.died`)}
                            error={!!errors.requests?.[index]?.died}
                            hint={errors.requests?.[index]?.died?.message}
                          />
                        </div>
                        <div className="col-span-12">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.houseRegistration
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            ที่อยู่ตามทะเบียนบ้าน
                            <span className="text-red-500">*</span>
                          </Label>
                          <TextArea
                            placeholder="กรอกที่อยู่ตามทะเบียนบ้าน"
                            rows={4}
                            disabled={page === "view"}
                            register={register(
                              `requests.${index}.houseRegistration`
                            )}
                            error={
                              !!errors.requests?.[index]?.houseRegistration
                            }
                            hint={
                              errors.requests?.[index]?.houseRegistration
                                ?.message
                            }
                          />
                        </div>
                        <div className="col-span-12">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.currentAddress
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            ที่อยู่ปัจจุบัน
                            <span className="text-red-500">*</span>
                          </Label>
                          <TextArea
                            placeholder="กรอกที่อยู่ปัจจุบัน"
                            rows={4}
                            disabled={page === "view"}
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
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.career
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            อาชีพ <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            placeholder="กรอกอาชีพ"
                            disabled={page === "view"}
                            {...register(`requests.${index}.career`)}
                            error={!!errors.requests?.[index]?.career}
                            errorMessage={
                              errors.requests?.[index]?.career?.message
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.income
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            รายได้ต่อเดือน (บาท)
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            placeholder="กรอกรายได้ต่อเดือน"
                            disabled={page === "view"}
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
                            register={register(
                              `requests.${index}.familyMembers`
                            )}
                            disabled={page === "view"}
                            error={!!errors.requests?.[index]?.familyMembers}
                            hint={
                              errors.requests?.[index]?.familyMembers?.message
                            }
                          />
                        </div>
                        <div className="col-span-12">
                          <Label>การให้ความช่วยเหลือจากหน่วยงานต่างๆ</Label>
                          <TextArea
                            disabled={page === "view"}
                            placeholder="กรอกรายละเอียดการให้ความช่วยเหลือจากหน่วยงานต่างๆ"
                            rows={4}
                            register={register(`requests.${index}.assistance`)}
                            error={!!errors.requests?.[index]?.assistance}
                            hint={errors.requests?.[index]?.assistance?.message}
                          />
                        </div>
                        {/* ภาพถ่ายก่อน/หลัง */}
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.beforeAfter
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            ภาพถ่ายเหตุการณ์ก่อน/หลัง (ถ้ามี)
                          </Label>
                          <FileInput
                            disabled={page === "view"}
                            register={register(`requests.${index}.beforeAfter`)}
                            error={!!errors.requests?.[index]?.beforeAfter}
                            errorMessage={
                              errors.requests?.[index]?.beforeAfter?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>

                        {/* สำเนาทะเบียนบ้าน */}
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.houseRegistrationFile
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            สำเนาทะเบียนบ้าน{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <FileInput
                            disabled={page === "view"}
                            register={register(
                              `requests.${index}.houseRegistrationFile`
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
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.citizenCard
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            สำเนาบัตรประจำตัวประชาชน{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <FileInput
                            disabled={page === "view"}
                            register={register(`requests.${index}.citizenCard`)}
                            error={!!errors.requests?.[index]?.citizenCard}
                            errorMessage={
                              errors.requests?.[index]?.citizenCard?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>

                        {/* บันทึกประจำวัน */}
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.dailyReport
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            บันทึกประจำวัน{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <FileInput
                            disabled={page === "view"}
                            register={register(`requests.${index}.dailyReport`)}
                            error={!!errors.requests?.[index]?.dailyReport}
                            errorMessage={
                              errors.requests?.[index]?.dailyReport?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>

                        {/* หนังสือรับรองการตาย */}
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.deathCertificate
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            หนังสือรับรองการตาย{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <FileInput
                            disabled={page === "view"}
                            register={register(
                              `requests.${index}.deathCertificate`
                            )}
                            error={!!errors.requests?.[index]?.deathCertificate}
                            errorMessage={
                              errors.requests?.[index]?.deathCertificate
                                ?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>

                        {/* มรณบัตร */}
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.deathRecord
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            มรณบัตร <span className="text-red-500">*</span>
                          </Label>
                          <FileInput
                            disabled={page === "view"}
                            register={register(`requests.${index}.deathRecord`)}
                            error={!!errors.requests?.[index]?.deathRecord}
                            errorMessage={
                              errors.requests?.[index]?.deathRecord?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>

                        {/* ใบสำคัญการสมรส (ถ้ามี) */}
                        <div className="col-span-12 lg:col-span-6">
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.marriageCertificate
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            ใบสำคัญการสมรส (ถ้ามี)
                          </Label>
                          <FileInput
                            disabled={page === "view"}
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
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.constructionCost
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            กรอกค่าก่อสร้างทั้งหมด/รายการประเมินราคาจากสำนักงานโยธาธิการและผังเมืองจังหวัด{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="flex gap-4">
                            <Input
                              type="text"
                              disabled={page === "view"}
                              placeholder="กรอกรวมค่าก่อสร้าง"
                              {...register(
                                `requests.${index}.constructionCost`
                              )}
                              error={
                                !!errors.requests?.[index]?.constructionCost
                              }
                              errorMessage={
                                errors.requests?.[index]?.constructionCost
                                  ?.message
                              }
                            />
                            <FileInput
                              register={register(
                                `requests.${index}.constructionCostFile`
                              )}
                              disabled={page === "view"}
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
                          <Label
                            className={`font-medium ${
                              errors.requests?.[index]?.fireCauseReport
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}
                          >
                            กรณีเพลิงไหม้บ้าน (ผลสาเหตุเพลิงไหม้จากตำรวจ){" "}
                            <span className="text-red-500">*</span>
                          </Label>

                          <FileInput
                            register={register(
                              `requests.${index}.fireCauseReport`
                            )}
                            disabled={page === "view"}
                            error={!!errors.requests?.[index]?.fireCauseReport}
                            errorMessage={
                              errors.requests?.[index]?.fireCauseReport?.message
                            }
                            hint="รองรับไฟล์ .pdf, .jpg, .png"
                          />
                        </div>
                      </div>

                      <Label
                        className={`font-medium ${
                          errors.requests?.[index]?.damage
                            ? "text-red-500"
                            : "text-gray-700"
                        }`}
                      >
                        ความเสียหาย <span className="text-red-500">*</span>
                      </Label>
                      {/* Damage */}
                      <RadioGroup
                        options={[
                          { value: "whole", label: "เสียหายทั้งหลัง" },
                          {
                            value: "minor",
                            label: "เสียหายน้อย (น้อยกว่า 30%)",
                          },
                          { value: "major", label: "เสียหายมาก (30-70%)" },
                        ]}
                        disabled={page === "view"}
                        register={register(`requests.${index}.damage`)}
                        error={!!errors.requests?.[index]?.damage}
                        errorMessage={errors.requests?.[index]?.damage?.message}
                      />
                    </Disclosure.Panel>
                  </>
                );
              }}
            </Disclosure>
          ))}
        </div>
        {/* Add new form */}
        {page != "view" && (
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
                damage: "",
                maritalStatus: "",
                religion: "",
                age: 0,
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
        )}
        <hr />
        <div>
          <Label
            className={`font-medium ${
              errors.totalPaid ? "text-red-500" : "text-gray-700"
            }`}
          >
            รวมทั้งสิ้น (บาท) <span className="text-red-500">*</span>
          </Label>

          <div className="relative flex items-center">
            <Input
              type="text"
              className="w-full"
              placeholder="จำนวนเงินทั้งหมด"
              {...register(`totalPaid`)}
              disabled={page === "view" && isLocked} // 👈 ถ้า view + locked → disabled
              error={!!errors.totalPaid}
              errorMessage={errors.totalPaid?.message}
            />

            {page === "view" && (
              <button
                type="button"
                onClick={() => setIsLocked((prev) => !prev)} // toggle lock/unlock
                className="absolute right-3 text-gray-500 hover:text-blue-600"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {page === "view" && (
          <div>
            <Label
              className={`font-medium ${
                errors.criteria ? "text-red-500" : "text-gray-700"
              }`}
            >
              เป็นไปตามตามหลักเกณฑ์หรือไม่{" "}
              <span className="text-red-500">*</span>
            </Label>
            {/* criteria */}
            <RadioGroup
              options={[
                { value: "ตามหลักเกณฑ์", label: "ตามหลักเกณฑ์" },
                {
                  value: "นอกเหนือหลักเกณฑ์",
                  label: "นอกเหนือหลักเกณฑ์",
                },
              ]}
              disabled={page != "view"}
              register={register(`criteria`)}
              error={!!errors.criteria}
              errorMessage={errors.criteria?.message}
            />
          </div>
        )}
        <div className="flex justify-end">
          {/* Submit */}
          <div className=" space-x-4 ">
            {page === "view" ? (
              <Button
                size="sm"
                className="!border-red-500 !text-red-500"
                type="submit"
                variant="outline"
              >
                ปฏิเสธ
              </Button>
            ) : (
              <Button
                size="sm"
                className="!border-red-500 !text-red-500"
                type="submit"
                variant="outline"
              >
                ยกเลิก
              </Button>
            )}
            {page === "view" ? (
              <Button size="sm" type="submit">
                อนุมัติ
              </Button>
            ) : (
              <Button size="sm" type="submit">
                ส่งข้อมูล
              </Button>
            )}
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
