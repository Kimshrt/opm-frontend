"use client";
import React from "react";
import Link from "next/link";

export default function FoundSection() {
  const funds = [
    {
      id: 1,
      title:
        "กองทุนเพื่อผู้ป่วยด้อยโอกาส ฯ ตามเป็นพระราชกุศล เนื่องในวาระ 70 พรรษา สมเด็จพระบรมราชาธิราชฯ",
      desc: "เพื่อสนับสนุนค่าใช้จ่ายในการดูแลรักษาผู้ป่วยของโรงพยาบาลศิริราชที่ขาดโอกาสใช้เทคโนโลยีขั้นสูงในการรักษา",
      img: "https://picsum.photos/600/400?random=21",
      donate: true,
    },
    {
      id: 2,
      title: "กองทุนสร้างนวัตกรรม",
      desc: "เพื่อจัดซื้อครุภัณฑ์ทางการแพทย์สำหรับการรักษาผู้ป่วยของโรงพยาบาลศิริราช (บริจาคติดตั้งในปีนี้เท่านั้น)",
      img: "https://picsum.photos/600/400?random=22",
      donate: true,
    },
    {
      id: 3,
      title: "กองทุนเพื่อพัฒนาการรักษาด้วยภูมิคุ้มกันบำบัด",
      desc: "เพื่อพัฒนาการรักษาผู้ป่วยมะเร็งเม็ดเลือด ด้วยเทคโนโลยี CAR-T Cell Therapy",
      img: "https://picsum.photos/600/400?random=23",
      donate: true,
    },
    {
      id: 4,
      title: "กองทุนเพิ่มเติม รอการช่วยเหลือ",
      desc: "กองทุนเพิ่มเติมของศิริราชมูลนิธิ",
      img: "https://picsum.photos/600/400?random=24",
      donate: false,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-700">
          ร่วมเป็นส่วนหนึ่งของการให้
        </h2>

        {/* ✅ Grid Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {funds.map((fund) => (
            <div
              key={fund.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* รูปด้านบน 16/9 */}
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={fund.img}
                  alt={fund.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* เนื้อหาด้านล่าง */}
              <div className="flex flex-col flex-grow p-4 space-y-3">
                <h3 className="font-semibold text-gray-800 line-clamp-2">
                  {fund.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {fund.desc}
                </p>

                {/* ปุ่มด้านล่าง */}
                <div className="mt-auto flex flex-col space-y-2">
                  {fund.donate ? (
                    <Link
                      href={`/donate/${fund.id}`}
                      className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold text-center hover:bg-purple-600 transition"
                    >
                      ร่วมบริจาค
                    </Link>
                  ) : (
                    <Link
                      href={`/donate`}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-center hover:bg-gray-200 transition"
                    >
                      รายละเอียด
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
