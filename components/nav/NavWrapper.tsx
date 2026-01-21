"use client";

import { useIsPublicRoute } from "@/hooks/useIsPublicRoute";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function NavWrapper() {
  const isPublicRoute = useIsPublicRoute();

  if (isPublicRoute) {
    return null;
  }

  return (
    <>
      <TopNav />
      <BottomNav />
    </>
  );
}
