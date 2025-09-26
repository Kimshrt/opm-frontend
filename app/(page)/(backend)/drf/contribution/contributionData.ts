export const contributionData = [
    {
        id: 1,
        project: "โครงการสร้างสนามเด็กเล่นเพื่อชุมชน",
        fullname: "สมชาย ใจดี",
        phoneNumber: "0812345678",
        email: "somchai@example.com",
        donations: [
            { item: "ลูกฟุตบอล", quantity: 5, price: 2500 },
            { item: "ชุดสนามเด็กเล่น", quantity: 1, price: 15000 },
        ],
        files: [
            new File(["mock content"], "donation1.png", { type: "image/png" }),
        ],
    },
    {
        id: 2,
        project: "โครงการบริจาคหนังสือเพื่อโรงเรียนห่างไกล",
        fullname: "สุดา สุขใจ",
        phoneNumber: "0823456789",
        email: "suda@example.com",
        donations: [
            { item: "หนังสือเรียน", quantity: 100, price: 10000 },
            { item: "สมุด", quantity: 200, price: 4000 },
        ],
        files: [
            new File(["mock content"], "donation2.jpg", { type: "image/jpeg" }),
        ],
    },
    {
        id: 3,
        project: "โครงการปลูกต้นไม้เพิ่มพื้นที่สีเขียว",
        fullname: "กิตติพงษ์ เขียวสด",
        phoneNumber: "0834567890",
        email: "kittipong@example.com",
        donations: [
            { item: "กล้าไม้", quantity: 50, price: 5000 },
            { item: "อุปกรณ์ปลูกต้นไม้", quantity: 10, price: 3000 },
        ],
        files: [
            new File(["mock content"], "donation3.webp", { type: "image/webp" }),
        ],
    },
    {
        id: 4,
        project: "โครงการซ่อมแซมศาลาชุมชน",
        fullname: "วิชัย บุญมาก",
        phoneNumber: "0845678901",
        email: "wichai@example.com",
        donations: [
            { item: "ไม้แปรรูป", quantity: 20, price: 8000 },
            { item: "สีทาไม้", quantity: 5, price: 2500 },
        ],
        files: [
            new File(["mock content"], "donation4.svg", { type: "image/svg+xml" }),
        ],
    },
    {
        id: 5,
        project: "โครงการช่วยเหลือผู้ประสบภัยน้ำท่วม",
        fullname: "ปวีณา ใจงาม",
        phoneNumber: "0856789012",
        email: "paweena@example.com",
        donations: [
            { item: "ข้าวสาร", quantity: 100, price: 3000 },
            { item: "น้ำดื่ม", quantity: 200, price: 4000 },
        ],
        files: [
            new File(["mock content"], "donation5.png", { type: "image/png" }),
        ],
    },
];
