"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            ข้อมูลส่วนบุคคล
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {/* ชื่อ-นามสกุล */}
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                ชื่อจริง
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                สมชาย
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                นามสกุล
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                ใจดี
              </p>
            </div>

            {/* เลขบัตร + วันเกิด */}
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                เลขบัตรประชาชน
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                1-2345-67890-12-3
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                วันเกิด
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                12 มกราคม 2525
              </p>
            </div>

            {/* ติดต่อ */}
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                อีเมล
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                somchai.jaidee@example.com
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                เบอร์โทรศัพท์
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                081-234-5678
              </p>
            </div>

            {/* หน่วยงาน + ตำแหน่ง */}
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                หน่วยงาน
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                สำนักปลัดสำนักนายกรัฐมนตรี
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                ตำแหน่ง
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                เจ้าหน้าที่บริหารงานทั่วไป
              </p>
            </div>

            {/* สิทธิ์การใช้งาน (Role) */}
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                สิทธิ์การใช้งาน (Role)
              </p>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700">
                Admin
              </span>
            </div>

            {/* ที่อยู่ */}
            <div className="lg:col-span-2">
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                ที่อยู่
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                99/45 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900
              </p>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                ข้อมูลเพิ่มเติม (Bio)
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                เจ้าหน้าที่ฝ่ายจัดการเอกสาร ดูแลการยื่นคำร้องขอเงินบริจาคช่วยเหลือภัยพิบัติ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
