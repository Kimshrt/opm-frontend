import React from "react";
import HeroBanner from "../ui/HeroBanner";
import NewsSection from "../ui/NewsSection";
import FoundSection from "../ui/FoundSection";

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Sub Banner */}
      <div className="bg-gradient-to-t from-[#0f9a95] via-[#1a237e] to-[#050b50]">
        <NewsSection />
      </div>

      {/* Found Section = กองทุนที่เปิดเผย */}
      <FoundSection />
    </div>
  );
}
