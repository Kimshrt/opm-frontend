"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

export default function NewsSection() {
  const news = [1, 2, 3, 4, 5];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Latest News</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1} // แสดงทีละ 1 การ์ด
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 }, // 📱 mobile
            768: { slidesPerView: 2 }, // 📲 tablet
            1024: { slidesPerView: 3 }, // 💻 desktop
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          {news.map((item) => (
            <SwiperSlide key={item}>
              <Link
                href={`/news/${item}`}
                className="text-blue-600 font-medium hover:underline"
              >
                <div className="bg-white rounded-2xl shadow hover:shadow-lg transition max-w-lg mx-auto">
                  <img
                    src={`https://picsum.photos/600/350?random=${item}`}
                    alt={`news-${item}`}
                    className="rounded-t-2xl w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      ข่าวที่ {item}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      เนื้อหาสั้น ๆ เกี่ยวกับข่าว {item} ...
                    </p>
                    อ่านเพิ่มเติม →
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
