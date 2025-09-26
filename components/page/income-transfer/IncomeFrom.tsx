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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { bankListData, channelListData, incomeData } from "@/app/(page)/(backend)/drf/income-transfer/incomeData";
import { incomeFormValues } from "@/type/incomeType";
import { bankData } from "@/app/(page)/(backend)/drf/bank/bankData";

interface Props {
  id?: string;
}

export default function IncomeFrom({ id }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isEdit = pathname.includes("edit") || pathname.includes("create");

  const fetchData = async (id: number) => {
    try {
      // const response = await fetch(`/api/bank/${id}`);
      // const data = await response.json();
      const data = incomeData.find((item) => item.id === id);
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<incomeFormValues>({
    defaultValues: {
      id: undefined,
      incomeDate: "",
      detail: "",
      channel_id: 0,
      amount: 0,
      bank_id: 0,
      accountName: "",
      payer: "",
    },
  });

  const watchedAmount = watch("amount");

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

  const onSubmit = (data: incomeFormValues) => {
    console.log("Form array data:", data);
  };

  return (
    <ComponentCard
      title={`เพิ่มรายการการรับเงิน`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <Label>
              เลขบัญชีธนาคาร <span className="text-red-500">*</span>
            </Label>
            <Select
              options={bankData.map((item) => ({
                value: item.id,
                label: item.accountNumber,
              }))}
              placeholder="เลือกเลขบัญชีธนาคาร"
              register={register("bank_id", {
                required: "กรุณาเลือกเลขบัญชีธนาคาร",
                onChange: (e: any) => {
                  const id = Number(e?.target?.value ?? 0);
                  const bank = bankData.find((b) => b.id === id);
                  // อัปเดตทั้งสองฟิลด์พร้อมกัน
                  setValue("bank_id", id, { shouldDirty: true, shouldValidate: true });
                  setValue("accountName", bank?.accountName ?? "", { shouldDirty: true, shouldValidate: true });
                },
              })}
              disabled={!isEdit}
              error={!!errors.bank_id}
              errorMessage={errors.bank_id?.message}
            />
          </div>

          <div>
            <Label>
              ชื่อบัญชีธนาคาร <span className="text-red-500">*</span>
            </Label>
            <Select
              options={bankData.map((item) => ({
                value: item.accountName,
                label: item.accountName,
              }))}
              placeholder="เลือกชื่อบัญชีธนาคาร"
              register={register("accountName", {
                required: "กรุณาเลือกชื่อบัญชีธนาคาร",
                onChange: (e: any) => {
                  const name = String(e?.target?.value ?? "");
                  const bank = bankData.find((b) => b.accountName === name);
                  // อัปเดตทั้งสองฟิลด์พร้อมกัน
                  setValue("accountName", name, { shouldDirty: true, shouldValidate: true });
                  setValue("bank_id", bank?.id ?? 0, { shouldDirty: true, shouldValidate: true });
                },
              })}
              disabled={!isEdit}
              error={!!errors.accountName}
              errorMessage={errors.accountName?.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <Label>ช่องทางรับเงิน <span className="text-red-500">*</span></Label>
            <Select
              options={channelListData.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              placeholder="เลือกช่องทางรับเงิน"
              register={register("channel_id", {
                required: "กรุณาเลือกช่องทางรับเงิน",
              })}
              disabled={!isEdit}
              error={!!errors.channel_id}
              errorMessage={errors.channel_id?.message}
            />
          </div>

          <div>
            <Label> ผู้บริจาค </Label>
            <Input
              register={register("payer", {
                required: "กรุณาชื่อผู้โอนเงิน",
              })}
              placeholder="ชื่อผู้โอนเงิน"
              disabled={!isEdit}
              error={!!errors.payer}
              errorMessage={errors.payer?.message}
            />
          </div>
        </div>

        {/* Date + Account Type + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <Label>
              จำนวนเงิน (บาท) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              value={watchedAmount || ""}
              register={register("amount", {
                required: "กรุณากรอกจำนวนเงิน",
              })}
              placeholder="จำนวนเงิน (บาท)"
              disabled={!isEdit}
              error={!!errors.amount}
              errorMessage={errors.amount?.message}
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
          <Label>ไฟล์เอกสาร <span className="text-red-500">*</span></Label>
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
    </ComponentCard >
  );
}
