"use client";

import { useIsPublicRoute } from "@/hooks/useIsPublicRoute";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPublicRoute = useIsPublicRoute();

  return (
    <main className={isPublicRoute ? "" : "md:pt-20 pb-20"}>
      <div
        className={
          isPublicRoute
            ? ""
            : "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-0"
        }
      >
        {children}
      </div>
    </main>
  );
}
