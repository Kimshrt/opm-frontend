'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function FoundSection() {
  const funds = [
    {
      id: 1,
      title: "โปร่งใส ตรวจสอบได้",
      desc: "ข้อมูลกองทุนทั้งหมดเปิดเผยต่อสาธารณะ เพื่อความโปร่งใส และสามารถตรวจสอบได้",
      img: "https://picsum.photos/800/400?random=11",
      list: ["รายการกองทุนล่าสุด", "รายงานการเงินประจำปี", "ข้อมูลผู้เกี่ยวข้อง"],
    },
    {
      id: 2,
      title: "กองทุนเพื่อสังคม",
      desc: "สนับสนุนโครงการที่เกี่ยวข้องกับชุมชนและการพัฒนาที่ยั่งยืน",
      img: "https://picsum.photos/800/400?random=12",
      list: ["สนับสนุนชุมชน", "กิจกรรมการศึกษา", "สิ่งแวดล้อม"],
    },
    {
      id: 3,
      title: "กองทุนเพื่อการศึกษา",
      desc: "สร้างโอกาสทางการศึกษาให้กับเยาวชนไทย",
      img: "https://picsum.photos/800/400?random=13",
      list: ["ทุนการศึกษา", "อุปกรณ์การเรียน", "การพัฒนาทักษะ"],
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          🏦 กองทุนที่เปิดเผย
        </h2>

        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 }, // 📱 mobile
            1024: { slidesPerView: 1 }, // 💻 desktop
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          {funds.map((fund) => (
            <SwiperSlide key={fund.id}>
              <div className="grid md:grid-cols-2 gap-6 items-center bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                <img
                  src={fund.img}
                  alt={fund.title}
                  className="rounded-2xl shadow-lg w-full object-cover"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">{fund.title}</h3>
                  <p className="text-gray-600">{fund.desc}</p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    {fund.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                  <button className="mt-4 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition">
                    ดูรายละเอียดกองทุน
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
