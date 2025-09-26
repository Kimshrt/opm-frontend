import FundsForm from '@/components/page/funds/FundsForm';
import React from 'react'

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div><FundsForm id={id} /></div>
  )
}
