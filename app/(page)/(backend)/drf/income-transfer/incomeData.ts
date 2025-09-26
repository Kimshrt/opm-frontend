export const bankListData = [
    { id: 1, name: "ธนาคารกรุงเทพ (BBL)" },
    { id: 2, name: "ธนาคารกสิกรไทย (KBank)" },
    { id: 3, name: "ธนาคารกรุงไทย (KTB)" },
    { id: 4, name: "ธนาคารไทยพาณิชย์ (SCB)" },
    { id: 5, name: "ธนาคารทหารไทยธนชาต (TTB)" },
    { id: 6, name: "ธนาคารกรุงศรีอยุธยา (BAY)" },
    { id: 7, name: "ธนาคารซีไอเอ็มบี ไทย (CIMB)" },
    { id: 8, name: "ธนาคารยูโอบี (UOB)" },
    { id: 9, name: "ธนาคารเกียรตินาคินภัทร (KKP)" },
    { id: 10, name: "ธนาคารทิสโก้ (TISCO)" },
    { id: 11, name: "ธนาคารแลนด์แอนด์เฮ้าส์ (LH Bank)" },
    { id: 12, name: "ธนาคารไอซีบีซี (ไทย) (ICBC)" },
    { id: 13, name: "ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)" },
    { id: 14, name: "ธนาคารออมสิน (GSB)" },
    { id: 15, name: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (BAAC)" },
    { id: 16, name: "ธนาคารอาคารสงเคราะห์ (GH Bank)" },
    { id: 17, name: "ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย (SME Bank)" },
    { id: 18, name: "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย (EXIM Bank)" },
];

export const channelListData = [
    {
        id: 1,
        name: "โอนผ่านธนาคาร"
    },
    {
        id: 2,
        name: "เงินสด"
    },
    {
        id: 3,
        name: "e-Donation"
    }
];

export const incomeData = [
    {
        id: 1,
        incomeDate: "23/04/2025",
        detail: "กองทุนช่วยเหลือ",
        channel_id: 1,
        amount: 50000.5,
        bank_id: 1,
        payer: "นาย ก.",
        note: "หมายเหตุ 1",
        accountFile: null
    },
    {
        id: 2,
        incomeDate: "23/05/2025",
        detail: "กองทุนช่วยเหลือ",
        channel_id: 2,
        amount: 1000.0,
        bank_id: null,
        payer: "นาย ข.",
        note: "หมายเหตุ 2",
        accountFile: null
    },
    {
        id: 3,
        incomeDate: "23/06/2025",
        detail: "กองทุนช่วยเหลือ",
        channel_id: 3,
        amount: 150000.0,
        bank_id: 3,
        payer: "นาย ค.",
        note: "หมายเหตุ 3",
        accountFile: null
    },
];
