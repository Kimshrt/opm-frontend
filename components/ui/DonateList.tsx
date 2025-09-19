'use client';
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./Pagination";

const donateData = [
  {
    id: 1,
    title: "ช่วยเหลือผู้ประสบอุทกภัย",
    excerpt: "ร่วมบริจาคเพื่อช่วยเหลือครอบครัวที่ได้รับผลกระทบจากน้ำท่วม...",
    img: "https://picsum.photos/1000/500?random=11",
    target: "500,000",
    received: "320,000",
  },
  {
    id: 2,
    title: "ทุนการศึกษาเด็กยากไร้",
    excerpt: "บริจาคเพื่อสนับสนุนการศึกษาและโอกาสในอนาคตให้กับเด็กที่ขาดแคลน...",
    img: "https://picsum.photos/600/350?random=12",
    target: "200,000",
    received: "85,000",
  },
  {
    id: 3,
    title: "อาหารกลางวันโรงเรียนชนบท",
    excerpt: "สมทบทุนเพื่อให้น้อง ๆ ได้ทานอาหารกลางวันที่มีคุณภาพทุกวัน...",
    img: "https://picsum.photos/600/350?random=13",
    target: "100,000",
    received: "42,500",
  },
  {
    id: 4,
    title: "โครงการปลูกป่า ฟื้นฟูสิ่งแวดล้อม",
    excerpt: "ร่วมเป็นส่วนหนึ่งในการปลูกต้นไม้และฟื้นฟูป่าที่เสื่อมโทรม...",
    img: "https://picsum.photos/600/350?random=14",
    target: "300,000",
    received: "150,000",
  },
];

export default function DonateList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [highlight, ...others] = donateData;

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-700">
          🎁 โครงการบริจาค
        </h1>

        {/* โครงการเด่น */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src={highlight.img}
              alt={highlight.title}
              className="w-full h-72 md:h-[400px] object-cover"
            />
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-700">
                {highlight.title}
              </h2>
              <p className="text-gray-600 mb-4">{highlight.excerpt}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 text-sm">
                  เป้าหมาย: {highlight.target} บาท
                </span>
                <span className="text-gray-700 text-sm">
                  ได้รับแล้ว: {highlight.received} บาท
                </span>
              </div>
              <Link
                href={`/donate/${highlight.id}`}
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                ร่วมบริจาค →
              </Link>
            </div>
          </div>
        </div>

        {/* โครงการอื่น ๆ */}
        <div className="grid md:grid-cols-3 gap-8">
          {others.map((donate) => (
            <div
              key={donate.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={donate.img}
                alt={donate.title}
                className="rounded-t-2xl w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-700">
                  {donate.title}
                </h3>
                <p className="text-gray-600 mb-4">{donate.excerpt}</p>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
                  <span>เป้าหมาย: {donate.target} บาท</span>
                  <span>ได้รับแล้ว: {donate.received} บาท</span>
                </div>
                <Link
                  href={`/donate/${donate.id}`}
                  className="text-green-600 font-medium hover:underline"
                >
                  ร่วมบริจาค →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={5}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}
