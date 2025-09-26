import { bankFormValues } from "./bankType";

export type incomeFormValues = {
    id?: number;          // รหัสรายการ (optional เวลา create)
    incomeDate: Date | string;  // วันที่ (วว/ดด/ปป)
    detail: string;       // รายละเอียดรายการ
    channel_id: number;      // ช่องทางรับเงิน (โอนผ่านธนาคาร, เงินสด, e-Donation)
    amount: number;       // จำนวนเงิน
    bank_id: number | null;         // ธนาคาร/ช่องทางที่รับ
    accountName: string;  // ชื่อบัญชี
    payer: string;        // ผู้โอนเงิน
    note: string;         // หมายเหตุ
    accountFile: File | null;
};
