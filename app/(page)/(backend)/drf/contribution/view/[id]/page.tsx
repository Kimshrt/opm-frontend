import ContributionForm from "@/components/page/contribution/ContributionForm";
import React from "react";

interface PageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <ContributionForm id={id} />
  );
}