"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useForm, useFieldArray } from "react-hook-form";
import Label from "@/components/form/Label";
import DatePicker from "@/components/form/date-picker";
import TextArea from "@/components/form/input/TextArea";
import FileInput from "@/components/form/input/FileInput";
import { useParams, usePathname, useRouter } from "next/navigation";
import { bankData } from "@/app/(page)/(backend)/drf/bank/bankData";
import { useEffect } from "react";

type FormValues = {
  accountName: string;      // ชื่อเปิดบัญชีธนาคาร
  accountNumber: string;    // หมายเลขบัญชี
  openDate: Date | string;  // วันที่เปิดบัญชี (ใช้ Date หรือ string ก็ได้ ขึ้นอยู่กับ DatePicker)
  accountType: string;      // ประเภทบัญชี (ออมทรัพย์, กระแสรายวัน ฯลฯ)
  isActive: boolean;        // สถานะ เปิดใช้งาน/ไม่เปิดใช้งาน
  note?: string;            // หมายเหตุ (optional)
  accountFile: File | null;
};

export default function RequestForm() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const isEdit = pathname.includes("edit") || pathname.includes("create");

  const fetchData = async (id: number) => {
    try {
      // const response = await fetch(`/api/bank/${id}`);
      // const data = await response.json();
      const data = bankData.find((item) => item.id === id);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      accountName: "",
      accountNumber: "",
      openDate: "",
      isActive: true,
      note: "",
      accountFile: null,
    },
  });

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

  const onSubmit = (data: FormValues) => {
    console.log("Form array data:", data);
  };

  return (
    <ComponentCard
      title={`เพิ่มบัญชีธนาคาร`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 "
      >
        <div>
          <Label>ชื่อเปิดบัญชีธนาคาร <span className="text-red-500">*</span></Label>
          <Input
            register={register("accountName", {
              required: "กรุณากรอกชื่อเปิดบัญชีธนาคาร",
            })}
            placeholder="ชื่อเปิดบัญชีธนาคาร"
            disabled={!isEdit}
            error={!!errors.accountName}
            errorMessage={errors.accountName?.message}
          />
        </div>

        <div>
          <Label>หมายเลขบัญชี <span className="text-red-500">*</span></Label>
          <Input
            register={register("accountNumber", {
              required: "กรุณากรอกหมายเลขบัญชี",
            })}
            placeholder="หมายเลขบัญชี"
            disabled={!isEdit}
            error={!!errors.accountNumber}
            errorMessage={errors.accountNumber?.message}
          />
        </div>

        {/* Date + Account Type + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>
              วันที่เปิดบัญชี (วว/ดด/ปป) <span className="text-red-500">*</span>
            </Label>
            <DatePicker
              name="openDate"
              control={control}
              id="openDate"
              placeholder="เลือกวันที่"
              mode="single"
              disabled={!isEdit}
              rules={{ required: "กรุณาเลือกวันที่" }}
            />
          </div>

          <div>
            <Label>
              ประเภทบัญชี <span className="text-red-500">*</span>
            </Label>
            <Select
              options={[
                { value: "บัญชีออมทรัพย์", label: "บัญชีออมทรัพย์" },
              ]}
              placeholder="เลือกประเภทบัญชี"
              register={register("accountType", {
                required: "กรุณาเลือกประเภทบัญชี",
              })}
              disabled={!isEdit}
              error={!!errors.accountType}
              errorMessage={errors.accountType?.message}
            />
          </div>

          <div>
            <Label>
              สถานะ <span className="text-red-500">*</span>
            </Label>
            <Select
              options={[
                { value: "true", label: "เปิดใช้งาน" },
                { value: "false", label: "ปิดใช้งาน" },
              ]}
              placeholder="เลือกสถานะ"
              register={register("isActive", {
                required: "กรุณาเลือกสถานะ",
              })}
              disabled={!isEdit}
              error={!!errors.isActive}
              errorMessage={errors.isActive?.message}
            />
          </div>
        </div>

        <div>
          <Label>หมายเหตุ</Label>
          <TextArea
            placeholder="กรุณาพิมพ์ข้อความของคุณ..."
            register={register("note")}
            disabled={!isEdit}
          />
        </div>

        <div className="">
          <Label>สําเนาสมุดบัญชีธนาคาร <span className="text-red-500">*</span></Label>
          <FileInput
            register={register(
              `accountFile`,
              {
                required: "กรุณาอัปโหลดไฟล์",
              }
            )}
            disabled={!isEdit}
            error={
              !!errors.accountFile
            }
            errorMessage={
              errors.accountFile
                ?.message
            }
            hint="รองรับไฟล์ .pdf, .jpg, .png"
          />
        </div>

        <hr />

        <div className="flex justify-end">
          <div className="space-x-4">
            <Button size="sm" variant="outline" onClick={() => router.push("/drf/bank")}>
              ยกเลิก
            </Button>
            {isEdit && (
              <Button size="sm" type="submit">
                บันทึก
              </Button>
            )}
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
