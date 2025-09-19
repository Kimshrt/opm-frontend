'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroBanner() {
    const images = [
        "https://picsum.photos/800/400?random=1",
        "https://picsum.photos/800/400?random=2",
        "https://picsum.photos/800/400?random=3",
    ];

    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20">
                {/* Left Content */}
                <div className="md:w-1/2 space-y-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Welcome to Our Platform
                    </h1>
                    <p className="text-lg md:text-xl opacity-90">
                        สร้างสรรค์โซลูชันดิจิทัล เพื่ออนาคตที่ดีกว่า
                    </p>
                    <div className="flex space-x-4">
                        <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
                            Get Started
                        </button>
                        <button className="px-6 py-3 border border-white rounded-lg hover:bg-white/20 transition">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right Image Slider */}
                <div className="md:w-1/2 mt-10 md:mt-0 w-full">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true} // ✅ วน loop
                        modules={[Autoplay]}
                        className="rounded-2xl shadow-lg"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`Slide ${index}`}
                                    className="w-full h-80 md:h-96 object-cover rounded-2xl"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
