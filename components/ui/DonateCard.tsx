"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface DonateCardProps {
  projectTitle: string;
}

export default function DonateCard({ projectTitle }: DonateCardProps) {
  const router = useRouter();

  const [type, setType] = useState<"money" | "goods">("money");
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [goods, setGoods] = useState<string[]>([]);
  const [customGoods, setCustomGoods] = useState<string[]>([]);

  const handleDonate = () => {
    if (type === "money") {
      const finalAmount = amount ?? Number(custom);
      if (!finalAmount || isNaN(finalAmount)) {
        alert("กรุณาเลือกหรือระบุจำนวนเงิน");
        return;
      }

      router.push(
        `/checkout?project=${encodeURIComponent(
          projectTitle
        )}&type=money&amount=${finalAmount}`
      );
    } else {
      const finalGoods = [...goods, ...customGoods].filter(Boolean);
      if (finalGoods.length === 0) {
        alert("กรุณาเลือกหรือระบุสิ่งของ");
        return;
      }

      router.push(
        `/checkout?project=${encodeURIComponent(
          projectTitle
        )}&type=goods&items=${encodeURIComponent(finalGoods.join(","))}`
      );
    }
  };

  return (
    <div className="p-6 sticky top-6 bg-white border rounded-2xl shadow-lg">
      {/* Description */}
      <p className="text-gray-700 italic mb-4">
        เงินบริจาคของคุณจะเป็นกองทุนค่าถุงยังชีพตามสถานการณ์ฉุกเฉิน
        เพื่อช่วยเหลือผู้สูงอายุ 5,000 คน
      </p>

      {/* Donation type switch */}
      <div className="flex mb-4 rounded-lg overflow-hidden border w-full">
        <button
          onClick={() => setType("money")}
          className={`flex-1 py-2 font-medium ${
            type === "money"
              ? "bg-orange-100 text-orange-600"
              : "bg-white text-gray-600"
          }`}
        >
          บริจาคเงิน
        </button>
        <button
          onClick={() => setType("goods")}
          className={`flex-1 py-2 font-medium ${
            type === "goods"
              ? "bg-orange-100 text-orange-600"
              : "bg-white text-gray-600"
          }`}
        >
          บริจาคสิ่งของ
        </button>
      </div>

      {/* Amount options */}
      {type === "money" && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[2000, 1000, 500].map((val) => (
            <button
              key={val}
              onClick={() => {
                setAmount(val);
                setCustom("");
              }}
              className={`py-3 rounded-lg border font-semibold ${
                amount === val && !custom
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white hover:bg-orange-50"
              }`}
            >
              {val.toLocaleString()} บาท
            </button>
          ))}
          <input
            type="number"
            placeholder="ระบุจำนวน"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onClick={() => setAmount(null)}
            className={`w-full border rounded-lg py-3 px-3 text-center focus:ring-2 focus:ring-orange-400 ${
              custom ? "border-orange-500 ring-1 ring-orange-400" : ""
            }`}
          />
        </div>
      )}

      {/* Goods donation */}
      {type === "goods" && (
        <div className="space-y-3 mb-4">
          {["ข้าวสาร", "น้ำดื่ม", "เสื้อผ้า", "ยารักษาโรค"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={item}
                value={item}
                checked={goods.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGoods([...goods, item]);
                  } else {
                    setGoods(goods.filter((g) => g !== item));
                  }
                }}
              />
              <label htmlFor={item} className="text-gray-700">
                {item}
              </label>
            </div>
          ))}

          {customGoods.map((g, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={g}
                onChange={(e) => {
                  const newGoods = [...customGoods];
                  newGoods[index] = e.target.value;
                  setCustomGoods(newGoods);
                }}
                placeholder="ระบุสิ่งของ"
                className="flex-1 border rounded-lg py-2 px-3 focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() =>
                  setCustomGoods(customGoods.filter((_, i) => i !== index))
                }
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setCustomGoods([...customGoods, ""])}
            className="w-full py-2 px-3 border rounded-lg text-orange-600 hover:bg-orange-50"
          >
            + เพิ่มสิ่งของ
          </button>
        </div>
      )}

      {/* Donate button */}
      <button
        onClick={handleDonate}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold shadow transition"
      >
        ❤️ บริจาค
      </button>

      {/* Tax info */}
      <p className="text-xs text-center text-gray-500 mt-3">
        รองรับ e-Donation ลดหย่อนภาษีได้ 1 เท่า
      </p>
    </div>
  );
}
