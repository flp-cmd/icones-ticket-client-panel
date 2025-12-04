"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import Image from "next/image";

export default function TopNav() {
  const pathname = usePathname();

  const isEventPage = pathname.startsWith("/event/");

  const isActive = (path: string) => {
    if (path === "dashboard" && pathname === "/") return true;
    if (path === "dashboard" && pathname === "/event/1") return true;
    if (pathname.startsWith(path)) return true;
    if (pathname.endsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Meus Eventos", path: "/" },
    { label: "Dashboard", path: "/event/1" },
    { label: "Relatórios", path: "/event/1/relatorios" },
    { label: "Repasse", path: "/event/1/repasse" },
  ];

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Image
            src={"/ic_logo_dark.png"}
            alt="Logo Icones"
            width={800}
            height={800}
            className="w-[130px] h-[50px]"
          />
          {isEventPage && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-[#0A484D]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Section: Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-medium text-gray-900">Joao Silva</p>
              <p className="text-xs text-gray-500">Produtor</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
              <User className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
