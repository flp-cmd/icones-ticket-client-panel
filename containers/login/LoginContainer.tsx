"use client";

import Image from "next/image";
import LoginForm from "./LoginForm";
import { useAuth } from "@/contexts/auth/AuthContext";
import LoginHeader from "./LoginHeader";
import { useEffect } from "react";
import LoginFooter from "./LoginFooter";
import TwoFactorForm from "./TwoFactorForm";

export default function LoginContainer() {
  const { requiresTwoFactor, resetAuth } = useAuth();

  useEffect(() => {
    resetAuth();
  }, [resetAuth]);

  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white z-10">
        <div className="w-full max-w-md">
          <LoginHeader requiresTwoFactor={requiresTwoFactor} />
          {requiresTwoFactor ? <TwoFactorForm /> : <LoginForm />}
          <LoginFooter requiresTwoFactor={requiresTwoFactor} />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />{" "}
        <div className="absolute inset-0">
          <Image
            src="/login_image.jpg"
            alt="Concert Crowd"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
