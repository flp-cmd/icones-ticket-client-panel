import { MOCK_DASHBOARD_STATS, MOCK_EVENTS } from "./data/mocks";
import Link from "next/link";
import { Calendar, DollarSign, Ticket, MapPin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Calendar color="#0A484D" size={18} />
        <h1 className="text-lg font-medium text-gray-800">
          Dashboard Produção
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Faturamento Total */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium text-gray-800">
                Faturamento Total
              </span>
              <DollarSign color="#0A484D" size={16} />
            </div>
          </div>
          <div className="text-xl font-bold text-[#0A484D]">
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
              <Ticket color="#0A484D" size={16} />
            </div>
          </div>
          <div className="text-xl font-bold text-[#0A484D]">
            {MOCK_DASHBOARD_STATS.totalTickets.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>

      {/* Meus Eventos */}
      <div>
        <div className="flex flex-col gap-2 md:gap-4 mb-4">
          <h2 className="text-base font-medium text-gray-800 mb-3 md:mb-0">
            Meus Eventos
          </h2>
          <div className="flex gap-1">
            <button className="bg-[#0A484D] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#083a3e] transition-colors">
              Todos
            </button>
            <button className="bg-[#F8F9FA] text-black px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
              Ativos
            </button>
            <button className="bg-[#F8F9FA] text-black px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
              Finalizados
            </button>
          </div>
        </div>

        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {MOCK_EVENTS.map((event) => (
            <Link
              href={`/event/${event.id}`}
              key={event.id}
              className="block group"
            >
              <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4 h-full">
                {/* Header: Image & Basic Info */}
                <div className="flex items-start gap-4">
                  {/* Event Image */}
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1 items-start">
                      <h3 className="font-semibold text-gray-900 text-md md:text-lg truncate pr-2">
                        {event.title}
                      </h3>
                      <span className="bg-[#D1FAE5] text-xs md:text-sm px-2 py-1 rounded-full text-[#0A484D] font-medium shrink-0">
                        Ativo
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-xs md:text-sm text-gray-500">
                      <div className="flex gap-2">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <MapPin size={14} />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Stats */}
                <div className="flex flex-col gap-2 border-t pt-3 border-gray-50 mt-auto">
                  {/* Faturamento */}
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-600 uppercase font-medium mb-0.5">
                      Faturamento
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#0A484D] font-bold">
                      <span>
                        R${" "}
                        {event.revenue.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 font-normal">
                        Ontem: R${" "}
                        {(
                          event.dailyRevenue?.[event.dailyRevenue.length - 2]
                            ?.amount || 0
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 font-normal">
                        Hoje: R${" "}
                        {(
                          event.dailyRevenue?.[event.dailyRevenue.length - 1]
                            ?.amount || 0
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Ingressos */}
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-600 uppercase font-medium mb-0.5">
                      Ingressos
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#0A484D] font-bold">
                      <span>{event.ticketsSold}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 font-normal">
                        Cortesias: {event.metrics?.cortesias || 0}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 font-normal">
                        Ontem:{" "}
                        {Math.floor(
                          (event.metrics?.ticketsSoldToday || 0) * 0.8
                        )}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 font-normal">
                        Hoje: {event.metrics?.ticketsSoldToday || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
