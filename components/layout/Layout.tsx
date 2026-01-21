"use client";

import { useIsPublicRoute } from "@/hooks/useIsPublicRoute";
import BottomNav from "../nav/BottomNav";
import TopNav from "../nav/TopNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isPublicRoute = useIsPublicRoute();

  if (isPublicRoute) {
    return <main>{children}</main>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="md:pt-20 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-0">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
