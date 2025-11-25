"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, User, FileText, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "dashboard" && pathname === "/") return true;
    if (path === "dashboard" && pathname === "/event/1") return true;
    if (pathname.startsWith(path)) return true;
    if (pathname.endsWith(path)) return true;
    return false;
  };

  const itensGeral = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
    },
    { id: "perfil" as const, label: "Perfil", icon: User, url: "/perfil" },
  ];

  const itensEvento = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      url: `/event/1/`,
    },
    {
      id: "relatorios" as const,
      label: "Relatórios",
      icon: FileText,
      url: `/event/1/relatorios`,
    },
    {
      id: "repasse" as const,
      label: "Repasse",
      icon: DollarSign,
      url: `/event/1/repasse`,
    },
  ];

  const isEventPage = pathname.startsWith("/event/");
  const itens = isEventPage ? itensEvento : itensGeral;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex items-center">
          {itens.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.url);
                }}
                className={`flex-1 flex flex-col items-center py-2 px-3 transition-colors ${
                  isActive(item.id)
                    ? "text-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive(item.id) ? "stroke-[2.5]" : ""
                  }`}
                />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
