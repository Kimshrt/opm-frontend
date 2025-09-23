"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

export default function NewsSection() {
  const news = [
    {
      id: 1,
      title: "โครงการใหม่เพื่อชุมชน",
      desc: "มูลนิธิได้เปิดโครงการใหม่เพื่อสนับสนุนชุมชน...",
      img: "https://picsum.photos/800/500?random=1",
    },
    {
      id: 2,
      title: "กิจกรรมวันเด็กแห่งชาติ",
      desc: "ร่วมแบ่งปันความสุขและของขวัญให้กับเด็ก ๆ...",
      img: "https://picsum.photos/800/500?random=2",
    },
    {
      id: 3,
      title: "ร่วมบริจาคช่วยเหลือผู้ป่วย",
      desc: "เปิดรับบริจาคเพื่อช่วยเหลือผู้ป่วยยากไร้...",
      img: "https://picsum.photos/800/500?random=3",
    },
    {
      id: 4,
      title: "อบรมพัฒนาทักษะอาสาสมัคร",
      desc: "จัดอบรมเพื่อเพิ่มศักยภาพอาสาสมัครในพื้นที่...",
      img: "https://picsum.photos/800/500?random=4",
    },
    {
      id: 5,
      title: "งานวิ่งการกุศลประจำปี",
      desc: "เชิญชวนร่วมงานวิ่งการกุศลเพื่อระดมทุน...",
      img: "https://picsum.photos/800/500?random=5",
    },
  ];

  return (
    <section className=" py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#fff]">
          ข่าวสาร
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* ฝั่งซ้าย: ข่าวใหญ่ + สไลด์ */}
          <div className="lg:col-span-2 h-full">
            <Swiper
              spaceBetween={20}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay]}
              className="w-full h-full"
            >
              {news.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={`/news/${item.id}`}>
                    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full aspect-[16/9] object-cover"
                      />
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-semibold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 flex-grow">{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ฝั่งขวา: ข่าวเล็ก 3 อัน + ปุ่มดูทั้งหมด */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-4 flex-grow">
              {news.slice(0, 2).map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden h-full flex flex-col">
                    {/* รูปด้านบน */}
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full aspect-[16/9] object-cover"
                    />
                    {/* เนื้อหาด้านล่าง */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ปุ่มดูทั้งหมด อยู่ล่างสุดเสมอ */}
            <Link
              href="/news"
              className="mt-4 inline-block text-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition"
            >
              ดูทั้งหมด
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
