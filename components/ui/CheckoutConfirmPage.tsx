"use client";
import { useSearchParams } from "next/navigation";

export default function CheckoutConfirmPage() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const section = searchParams.get("section");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">ยืนยันการชำระเงิน</h1>
      <p className="mb-4">Section: {section}</p>

      {method === "qrcode" && (
        <div>
          <p className="mb-2">กรุณาสแกน QR Code ด้านล่างเพื่อชำระเงิน:</p>
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
            <span>QR CODE</span>
          </div>
        </div>
      )}

      {method === "bank" && (
        <div>
          <p className="mb-2">กรุณาอัปโหลดสลิปการโอนเงิน:</p>
          <input type="file" accept="image/*" className="mb-4" />
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            ส่งสลิป
          </button>
        </div>
      )}
    </div>
  );
}
