import RequestList from '@/components/page/request/RequestList'
import React from 'react'
import type { Metadata } from 'next'

// ✅ กำหนด Meta Tag
export const metadata: Metadata = {
  title: 'ยื่นเอกสารคำร้อง | ระบบบริการออนไลน์',
  description: 'ระบบสำหรับยื่นเอกสารคำร้องออนไลน์ ตรวจสอบสถานะคำร้อง และติดตามผลได้ง่ายๆ',
  keywords: ['ยื่นคำร้อง', 'ระบบออนไลน์', 'Request', 'Petition'],
  openGraph: {
    title: 'ยื่นเอกสารคำร้อง | ระบบบริการออนไลน์',
    description: 'ระบบสำหรับยื่นเอกสารคำร้องออนไลน์ ตรวจสอบสถานะคำร้อง และติดตามผลได้ง่ายๆ',
    url: 'https://your-domain.com/request',
    siteName: 'ระบบบริการออนไลน์',
    images: [
      {
        url: '/images/og-request.png', // ✅ ใส่รูป preview
        width: 1200,
        height: 630,
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://your-domain.com/request',
  },
}

export default function Page() {
  return (
    <div>
      <RequestList />
    </div>
  )
}
