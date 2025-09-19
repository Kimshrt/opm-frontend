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
            <section className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <img
                            src="https://picsum.photos/100"
                            alt="icon"
                            className="mx-auto mb-4 rounded-full"
                        />
                        <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
                        <p className="text-gray-600">รายละเอียดเกี่ยวกับ Feature แรก</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <img
                            src="https://picsum.photos/101"
                            alt="icon"
                            className="mx-auto mb-4 rounded-full"
                        />
                        <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
                        <p className="text-gray-600">รายละเอียดเกี่ยวกับ Feature สอง</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <img
                            src="https://picsum.photos/102"
                            alt="icon"
                            className="mx-auto mb-4 rounded-full"
                        />
                        <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
                        <p className="text-gray-600">รายละเอียดเกี่ยวกับ Feature สาม</p>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <NewsSection />

            {/* Found Section = กองทุนที่เปิดเผย */}
            <FoundSection />
        </div>
    );
}
