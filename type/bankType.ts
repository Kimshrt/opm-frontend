export type bankFormValues = {
    accountName: string;      // ชื่อเปิดบัญชีธนาคาร
    accountNumber: string;    // หมายเลขบัญชี
    openDate: Date | string;  // วันที่เปิดบัญชี (ใช้ Date หรือ string ก็ได้ ขึ้นอยู่กับ DatePicker)
    accountType: string;      // ประเภทบัญชี (ออมทรัพย์, กระแสรายวัน ฯลฯ)
    department?: number;       // แผนก
    isActive: boolean;        // สถานะ เปิดใช้งาน/ไม่เปิดใช้งาน
    note?: string;            // หมายเหตุ (optional)
    accountFile: File | null;
};

export type departmentType = {
    id?: number;
    name?: string;
};