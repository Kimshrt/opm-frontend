import RequestForm from "@/components/page/request/RequestFrom";
import React from "react";

type PageProps = {
  params: Promise<{ id: string; disastersId: string }>; // 👈 params ต้องเป็น Promise
};

export default async function Page({ params }: PageProps) {
  const { id, disastersId } = await params; // 👈 await ก่อน destructure

  return (
    <div>
      <RequestForm page="edit" id={id} disastersId={disastersId} />
      <div className="border mt-4 border-[#000] p-4 rounded-xl bg-white">
        kim
      </div>
    </div>
  );
}
