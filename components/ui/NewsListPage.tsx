'use client';
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./Pagination";

const newsData = [
    {
        id: 1,
        title: "ข่าวเด่นพิเศษวันนี้",
        excerpt: "เนื้อหาข่าวเด่นสั้น ๆ สำหรับดึงดูดความสนใจ...",
        img: "https://picsum.photos/1000/500?random=10",
    },
    {
        id: 2,
        title: "ข่าวที่ 2",
        excerpt: "สรุปเนื้อหาสั้น ๆ ของข่าวที่ 2...",
        img: "https://picsum.photos/600/350?random=2",
    },
    {
        id: 3,
        title: "ข่าวที่ 3",
        excerpt: "สรุปเนื้อหาสั้น ๆ ของข่าวที่ 3...",
        img: "https://picsum.photos/600/350?random=3",
    },
    {
        id: 4,
        title: "ข่าวที่ 4",
        excerpt: "สรุปเนื้อหาสั้น ๆ ของข่าวที่ 4...",
        img: "https://picsum.photos/600/350?random=4",
    },
    {
        id: 5,
        title: "ข่าวที่ 5",
        excerpt: "สรุปเนื้อหาสั้น ๆ ของข่าวที่ 5...",
        img: "https://picsum.photos/600/350?random=5",
    },
];

export default function NewsListPage() {
    // ดึงข่าวแรกมาเป็น "ข่าวเด่น"
    const [currentPage, setCurrentPage] = useState(1);
    const [highlight, ...others] = newsData;

    return (
        <section className="bg-gray-50 py-16 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    📰 ข่าวสารทั้งหมด
                </h1>

                {/* ข่าวเด่น */}
                <div className="mb-12">
                    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                        <img
                            src={highlight.img}
                            alt={highlight.title}
                            className="w-full h-72 md:h-[400px] object-cover"
                        />
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                {highlight.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{highlight.excerpt}</p>
                            <Link
                                href={`/news/${highlight.id}`}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                อ่านเพิ่มเติม →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ข่าวอื่น ๆ */}
                <div className="grid md:grid-cols-4 gap-8">
                    {others.map((news) => (
                        <div
                            key={news.id}
                            className="bg-white rounded-2xl shadow hover:shadow-lg transition"
                        >
                            <img
                                src={news.img}
                                alt={news.title}
                                className="rounded-t-2xl w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                                <Link
                                    href={`/news/${news.id}`}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    อ่านเพิ่มเติม →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    totalPages={10}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </section>
    );
}
