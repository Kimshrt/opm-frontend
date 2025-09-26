import IncomeFrom from "@/components/page/income-transfer/IncomeFrom";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <IncomeFrom id={id} />
  );
}