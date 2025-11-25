import { MOCK_DASHBOARD_STATS, MOCK_EVENTS } from "./data/mocks";
import Link from "next/link";
import { Calendar, DollarSign, Ticket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Calendar color="#0D5C63" size={18} />
          <h1 className="text-lg font-medium text-gray-800">Dashboard Produção</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Faturamento Total */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-medium text-gray-800">
                  Faturamento Total
                </span>
                <DollarSign color="#0D5C63" size={16} />
              </div>
            </div>
            <div className="text-xl font-bold text-black">
              R${" "}
              {MOCK_DASHBOARD_STATS.totalRevenue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>

          {/* Ingressos Vendidos */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-medium text-gray-800">
                  Ingressos Vendidos
                </span>
                <Ticket color="#0D5C63" size={16} />
              </div>
            </div>
            <div className="text-xl font-bold text-black">
              {MOCK_DASHBOARD_STATS.totalTickets.toLocaleString("pt-BR")}
            </div>
          </div>
        </div>

        {/* Meus Eventos */}
        <div>
          <h2 className="text-base font-medium text-gray-800 mb-3">
            Meus Eventos
          </h2>
          <div className="flex gap-1 mb-3">
            <button className="bg-[#0D5C63] text-white px-2 py-1 rounded-lg">Todos</button>
            <button className="bg-[#F8F9FA] text-black px-2 py-1 rounded-lg">
              Ativos
            </button>
            <button className="bg-[#F8F9FA] text-black px-2 py-1 rounded-lg">
              Finalizados
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_EVENTS.map((event) => (
              <Link
                href={`/event/${event.id}`}
                key={event.id}
                className="block"
              >
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-4">
                  {/* Event Image Placeholder */}
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0`}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex justify-between mb-2 items-center">
                      <h3 className="font-semibold text-gray-900 text-md truncate">
                        {event.title}
                      </h3>
                      <button className="bg-[#D1FAE5] text-sm px-2 py-1 rounded-lg text-[#0D5C63]">
                        Ativo
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      {event.date} • {event.location}
                    </p>

                    <div className="flex gap-6">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-medium">
                          Faturamento
                        </p>
                        <p className="text-xs font-semibold text-green-600">
                          R${" "}
                          {event.revenue.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-medium">
                          Ingressos
                        </p>
                        <p className="text-xs font-semibold text-blue-600">
                          {event.ticketsSold}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
