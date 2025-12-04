"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { NavigationService } from "@/services/navigationService";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const items = NavigationService.getBreadcrumbItems(pathname);

  if (items.length <= 1) return null;

  return (
    <nav className="hidden md:flex items-center text-sm text-gray-500 mb-6">
      <Link
        href="/"
        className="hover:text-[#0A484D] transition-colors flex items-center"
      >
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-[#0A484D] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
