"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";

export default function TopNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEventPage = pathname.startsWith("/event/");

  const isActive = (path: string) => {
    if (path === "dashboard" && pathname === "/") return true;
    if (path === "dashboard" && pathname === "/event/1") return true;
    if (pathname.startsWith(path)) return true;
    if (pathname.endsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Meus Eventos", path: "/" },
    { label: "Dashboard", path: "/event/1" },
    { label: "Relatórios", path: "/event/1/relatorios" },
    { label: "Repasse", path: "/event/1/repasse" },
  ];

  return (
    <header className="hidden justify-center md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1440px] w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image
              src={"/ic_logo_dark.png"}
              alt="Logo Icones"
              width={800}
              height={800}
              loading="eager"
              className="w-[130px] h-[50px]"
            />
          </Link>
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
        <div className="flex items-center gap-4" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:bg-gray-50 p-2 rounded-lg transition-colors focus:outline-none"
            >
              <div className="text-right hidden lg:block mr-3">
                <p className="text-sm font-medium text-gray-900">Joao Silva</p>
                <p className="text-xs text-gray-500">Produtor</p>
              </div>
              <div className="w-10 h-10 mr-1 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                <User className="text-gray-400" size={20} />
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={16} />
                  Perfil
                </Link>
                <div className="h-px bg-gray-100 my-1" />
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
