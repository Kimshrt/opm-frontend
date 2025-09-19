"use client";
import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FiFacebook, FiX as FiTwitter, FiInstagram, FiLink } from "react-icons/fi";
import { BsLine } from "react-icons/bs";

export default function NewsDetail() {
  const news = {
    id: 1,
    title: "โครงการช่วยเหลือผู้ประสบอุทกภัย จ.เชียงใหม่",
    cover: "https://picsum.photos/2100/900",
    date: "21 กันยายน 2568",
    views: 1234,
    detail: `
รัฐบาลประกาศโครงการช่วยเหลือผู้ประสบอุทกภัยในจังหวัดเชียงใหม่ โดยจัดสรรงบประมาณเพื่อสนับสนุนการฟื้นฟูทั้งในด้านโครงสร้างพื้นฐานและการช่วยเหลือประชาชนที่ได้รับผลกระทบ 
บ้านเรือนที่เสียหายจะได้รับการซ่อมแซมและเยียวยาตามมาตรการที่กำหนดไว้ พร้อมทั้งมีการจัดตั้งศูนย์อพยพชั่วคราวเพื่อรองรับครอบครัวที่ไม่สามารถกลับเข้าบ้านได้

นอกจากนี้ยังมีการจัดส่งทีมแพทย์และอาสาสมัครลงพื้นที่เพื่อดูแลสุขภาพของประชาชน รวมถึงการแจกจ่ายอาหาร น้ำดื่ม และสิ่งของจำเป็น 
โดยรัฐบาลเน้นย้ำถึงการมีส่วนร่วมของทุกภาคส่วน ไม่ว่าจะเป็นหน่วยงานภาครัฐ ภาคเอกชน และองค์กรสาธารณกุศล เพื่อให้การช่วยเหลือครอบคลุมและทั่วถึงที่สุด

โครงการนี้ยังครอบคลุมไปถึงการฟื้นฟูพื้นที่เกษตรกรรมที่ได้รับผลกระทบจากน้ำท่วม เพื่อให้เกษตรกรสามารถกลับมาประกอบอาชีพได้โดยเร็ว 
ทั้งนี้รัฐบาลยังเตรียมมาตรการด้านการเงิน เช่น เงินกู้ดอกเบี้ยต่ำ เพื่อช่วยบรรเทาความเดือดร้อนของเกษตรกรและผู้ประกอบการในพื้นที่ที่ได้รับผลกระทบโดยตรง
  `,
    attachments: [
      { name: "เอกสารรายละเอียดโครงการ.pdf", url: "#" },
      { name: "ภาพประกอบ.jpg", url: "#" },
    ],
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("คัดลอกลิงก์เรียบร้อย!");
  };

  return (
    <div className="container mx-auto  px-4">
      {/* Cover */}
      <div className="relative w-full aspect-[21/9] mb-4">
        <Image
          src={news.cover}
          alt="cover"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Meta */}
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{news.date}</span>
        <span>{news.views.toLocaleString()} views</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{news.title}</h1>

      {/* Share buttons */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-500">แชร์ข่าว:</span>

        <FacebookShareButton url={shareUrl} title={news.title}>
          <div className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            <FiFacebook className="w-5 h-5" />
          </div>
        </FacebookShareButton>

        <LineShareButton url={shareUrl} title={news.title}>
          <div className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            <BsLine className="w-5 h-5" />
          </div>
        </LineShareButton>

        <TwitterShareButton url={shareUrl} title={news.title}>
          <div className="p-2 bg-black text-white rounded-full hover:bg-gray-800">
            <FiTwitter className="w-5 h-5" />
          </div>
        </TwitterShareButton>

        <button
          onClick={handleCopyLink}
          className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
        >
          <FiLink className="w-5 h-5" />
        </button>
      </div>

      {/* Detail */}
      <div className="prose prose-gray max-w-none dark:prose-invert mb-6 whitespace-pre-line">
        {news.detail}
      </div>

      {/* Attachments */}
      {news.attachments.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">ไฟล์แนบ</h2>
          <ul className="list-disc list-inside text-blue-600 space-y-1">
            {news.attachments.map((file, i) => (
              <li key={i}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
