"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroBanner() {
  const slides = [
    {
      type: "image",
      src: "https://picsum.photos/1600/800?random=1",
      title: "“ทุกช่องทาง\nการให้\nล้วนสำคัญ”",
      desc: "ร่วมเป็นอีกหนึ่งช่องทางการบริจาค",
      button: {
        text: "ความร่วมมือองค์กร ↗",
        href: "#",
        style: "border border-white hover:bg-white/20",
      },
    },
    {
      type: "video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "“พลังแห่งการแบ่งปัน”",
      desc: "ทุกการช่วยเหลือ คือพลังที่เปลี่ยนแปลง",
      button: {
        text: "ดูโครงการ",
        href: "#",
        style: "bg-yellow-400 text-black hover:bg-yellow-500",
      },
    },
    {
      type: "image",
      src: "https://picsum.photos/1600/800?random=2",
      title: "“อนาคตที่ยั่งยืน”",
      desc: "เรามุ่งมั่นสร้างสังคมที่ดีขึ้น ผ่านโครงการต่าง ๆ",
      button: {
        text: "เกี่ยวกับเรา",
        href: "#",
        style: "bg-green-500 hover:bg-green-600",
      },
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-[16/9]">
              {/* Media */}
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover "
                />
              ) : (
                <img
                  src={slide.src}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover "
                />
              )}

              {/* ✅ Glassmorphism Overlay (ด้านขวา) */}
              <div className="hidden absolute inset-0 md:flex items-center justify-end px-6 md:px-16 z-10">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-md text-white shadow-lg">
                  <h1 className="text-2xl md:text-4xl font-bold whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-base md:text-lg">{slide.desc}</p>
                  {slide.button && (
                    <a
                      href={slide.button.href}
                      className={`inline-block mt-6 px-6 py-3 rounded-lg font-semibold transition ${slide.button.style}`}
                    >
                      {slide.button.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </section>
  );
}
