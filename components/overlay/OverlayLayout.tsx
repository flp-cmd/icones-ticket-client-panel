"use client";

import { ReactNode } from "react";

interface OverlayLayoutProps {
  children: ReactNode;
}

export default function OverlayLayout({ children }: OverlayLayoutProps) {
  return (
    <div className="absolute inset-0 z-50 flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar Skeleton */}
      <aside className="hidden w-72 flex-col justify-between border-r border-[#e9ecef] bg-[#f8f9fa] shadow-xl lg:flex">
        {/* Sidebar Header Skeleton */}
        <div className="border-b border-[#e9ecef] p-6">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Sidebar Menu Skeleton */}
        <div className="flex-1 px-8 py-6">
          {[1, 2, 3, 4].map((section) => (
            <div key={section} className="mb-8">
              {/* Section Title */}
              <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gray-200"></div>

              {/* Menu Items */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="mb-3 flex items-center space-x-3">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-auto">
        {/* Header Skeleton */}
        <header className="bg-[#f8f9fa] px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-6 lg:pl-8">
          <div className="flex items-center justify-between gap-4">
            {/* Header Left */}
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 flex-1 items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-1 md:gap-2">
                    <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-gray-200 md:h-5 md:w-5"></div>
                    <div className="h-3 w-3 shrink-0 animate-pulse rounded bg-gray-200 md:h-4 md:w-4"></div>
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200 md:w-48"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Right */}
            <div className="flex shrink-0 items-center gap-1 md:gap-2 lg:gap-6">
              <div className="h-5 w-5 animate-pulse rounded bg-gray-200 md:h-6 md:w-6"></div>
              <div className="h-5 w-5 animate-pulse rounded bg-gray-200 md:h-6 md:w-6"></div>
              <div className="h-5 w-5 animate-pulse rounded bg-gray-200 md:h-6 md:w-6"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 pt-2 md:p-8 md:pt-0">{children}</div>
      </div>
    </div>
  );
}
