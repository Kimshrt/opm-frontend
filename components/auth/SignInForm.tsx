"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState(["", "", "", ""]);
  // ✅ handle กรอก OTP ทีละช่อง
  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // ✅ submit login -> ไปหน้า OTP
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  // ✅ submit OTP
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("OTP ที่กรอก: " + otp.join(""));
  };
  return (
    <div className="container mx-auto md:px-0 px-4">
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              {step === "login" && (
                <div>
                  <div className="mb-5 sm:mb-8">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                      เข้าสู่ระบบ
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
                    </p>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 ">
                      <button className="bg-thaid h-[3rem] inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"></button>
                    </div>
                    <div className="relative py-3 sm:py-5">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="p-2 text-gray-400 bg-[#f9fafb] dark:bg-gray-900 sm:px-5 sm:py-2">
                          หรือ
                        </span>
                      </div>
                    </div>
                    <form onSubmit={handleLogin}>
                      <div className="space-y-6">
                        <div>
                          <Label>
                            อีเมล <span className="text-error-500">*</span>{" "}
                          </Label>
                          <Input placeholder="info@gmail.com" type="email" />
                        </div>
                        <div>
                          <Label>
                            รหัสผ่าน <span className="text-error-500">*</span>{" "}
                          </Label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="*******"
                            />
                            <span
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                            >
                              {showPassword ? (
                                <EyeIcon className="fill-[#fff] dark:fill-gray-400" />
                              ) : (
                                <EyeCloseIcon className="fill-[#fff] dark:fill-gray-400" />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                              จดจำฉันไว้
                            </span>
                          </div>
                          <Link
                            href="/reset-password"
                            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                          >
                            ลืมรหัสผ่าน?
                          </Link>
                        </div>
                        <div>
                          <Button type="submit" className="w-full !bg-[#fdcd0e]" size="sm">
                            เข้าสู่ระบบ
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {step === "otp" && (
                <div className="border rounded-xl p-6 text-center space-y-4">
                  <h2 className="font-semibold text-gray-800 dark:text-white/90">
                    ยืนยันตัวตน
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    กรอกรหัส OTP ที่ได้รับทางอีเมล <br />
                    <span className="font-medium">example@opm.go.th</span>
                  </p>

                  <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, i)}
                          className="w-12 h-12 border text-center text-lg rounded-lg"
                        />
                      ))}
                    </div>
                    <div className="text-gray-500 text-sm">Ref: QMNUBP</div>
                    <Button
                      className="w-full !bg-[#fdcd0e]"
                      size="sm"
                      type="submit"
                    >
                      ยืนยัน OTP
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
