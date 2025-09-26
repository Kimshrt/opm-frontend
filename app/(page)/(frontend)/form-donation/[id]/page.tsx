import DonationForm from '@/components/page/form-donation/DonationForm'
import React from 'react'

interface PageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <DonationForm id={id} />
}