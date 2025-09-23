"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const project = searchParams.get("project");
  const type = searchParams.get("type");
  const amount = searchParams.get("amount");
  const items = searchParams.get("items");
  const section = searchParams.get("section") || "general";

  const [method, setMethod] = useState<"qrcode" | "credit" | "bank">("qrcode");

  const handleSubmit = () => {
    if (method === "bank" || method === "qrcode") {
      router.push(`/checkout/confirm?method=${method}&section=${section}`);
    } else {
      alert("บัตรเครดิต: ดำเนินการชำระเงินสำเร็จ");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">ยืนยันการบริจาค</h1>

      {/* Project Info */}
      <div className="mb-6">
        <p className="font-semibold">โครงการ:</p>
        <p className="mb-2">{project}</p>
        <p className="font-semibold">ประเภทการบริจาค:</p>
        {type === "money" && <p>เงิน {amount} บาท</p>}
        {type === "goods" && <p>สิ่งของ: {items}</p>}
      </div>

      {/* Payment Method */}
      <h2 className="text-lg font-semibold mb-2">ช่องทางในการบริจาค</h2>
      <div className="flex gap-4 mb-4">
        {["qrcode", "credit", "bank"].map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m as any)}
            className={`flex-1 p-3 rounded-lg border ${
              method === m
                ? "bg-orange-100 border-orange-500 text-orange-600"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {m === "qrcode" ? "QR Code" : m === "credit" ? "บัตรเครดิต" : "โอนเงิน"}
          </button>
        ))}
      </div>

      {/* Method-specific form */}

      {method === "credit" && (
        <div className="mb-6 space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="หมายเลขบัตร*" />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="ชื่อบนบัตร*" />
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="วันหมดอายุ (MM/YY)*" />
            <input className="border rounded-lg px-3 py-2" placeholder="รหัส CVV*" />
          </div>
        </div>
      )}

      {method === "bank" && (
        <div className="mb-6">
          <p className="mb-2 font-medium">เลขบัญชีสำหรับโอนเงิน</p>
          <div className="p-3 bg-gray-100 border rounded-lg">
            ธนาคารกรุงเทพ 123-4-56789-0 <br />
            ชื่อบัญชี: โครงการช่วยเหลือผู้สูงอายุ
          </div>
        </div>
      )}

      {/* Receipt Info */}
      <h2 className="text-lg font-semibold mb-2">ข้อมูลใบเสร็จรับเงิน</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <input className="border rounded-lg px-3 py-2" placeholder="คำนำหน้า*" />
        <input className="border rounded-lg px-3 py-2" placeholder="ชื่อ*" />
        <input className="border rounded-lg px-3 py-2" placeholder="นามสกุล*" />
        <input className="border rounded-lg px-3 py-2" placeholder="อีเมล*" />
        <input className="border rounded-lg px-3 py-2 col-span-2" placeholder="เบอร์โทรศัพท์*" />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">ย้อนกลับ</button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
}
