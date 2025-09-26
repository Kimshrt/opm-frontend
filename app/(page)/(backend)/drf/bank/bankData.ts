export const department = [
    {
        id: 1,
        name: "สปน.",
    },
    {
        id: 2,
        name: "จ.น่าน",
    },
    {
        id: 3,
        name: "จ.เลย",
    },
]

export const bankData = [
    {
        id: 1,
        accountName: "กองทุนช่วยเหลือ 1",
        accountNumber: "202500001",
        openDate: "23/04/2025",
        accountType: "บัญชีออมทรัพย์",
        department: department.find((item) => item.id === 1),
        isActive: true,
        note: "เปิดเมื่อวันที่...ไว้สำหรับ...",
        accountFile: null,
    },
    {
        id: 2,
        accountName: "กองทุนช่วยเหลือ 2",
        accountNumber: "202500002",
        openDate: "23/05/2025",
        accountType: "บัญชีออมทรัพย์",
        department: department.find((item) => item.id === 2),
        isActive: false,
        note: "",
        accountFile: null,
    },
    {
        id: 3,
        accountName: "กองทุนช่วยเหลือ 3",
        accountNumber: "202500003",
        openDate: "23/06/2025",
        accountType: "บัญชีออมทรัพย์",
        department: department.find((item) => item.id === 3),
        isActive: true,
        note: "",
        accountFile: null,
    },
];