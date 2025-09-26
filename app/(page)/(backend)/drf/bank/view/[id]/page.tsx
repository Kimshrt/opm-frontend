import BankFrom from "@/components/page/bank/BankFrom";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <BankFrom id={id} />
  );
}