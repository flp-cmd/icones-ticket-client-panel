"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, User, FileText, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isEventPage = pathname.startsWith("/evento/");
  const eventId = isEventPage ? pathname.split("/")[2] : null;

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    if (eventId && url === `/evento/${eventId}`) return pathname === url;
    return pathname.startsWith(url);
  };

  const itemsGeral = [
    {
      id: "dashboard" as const,
      label: "Eventos",
      icon: LayoutDashboard,
      url: "/",
    },
    { id: "perfil" as const, label: "Perfil", icon: User, url: "/perfil" },
  ];

  const itemsEvento = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      url: `/evento/${eventId}`,
    },
    {
      id: "relatorios" as const,
      label: "Relatórios",
      icon: FileText,
      url: `/evento/${eventId}/relatorios`,
    },
    {
      id: "repasse" as const,
      label: "Repasse",
      icon: DollarSign,
      url: `/evento/${eventId}/repasse`,
    },
  ];

  const items = isEventPage && eventId ? itemsEvento : itemsGeral;

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg pb-safe z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.url);
                }}
                className={`flex-1 flex flex-col items-center py-2 px-3 transition-colors ${
                  isActive(item.url)
                    ? "text-[#0A484D]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive(item.url) ? "stroke-[2.5]" : ""
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
