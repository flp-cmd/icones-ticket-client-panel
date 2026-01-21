import { EventSchedule } from "@/types/events";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { formatCurrency } from "@/utils/currencyUtils";

interface ScheduleCardProps {
  event: EventSchedule;
}

export default function ScheduleCard({ event }: ScheduleCardProps) {
  return (
    <Link
      href={`/evento/${event.scheduleId}`}
      key={event.scheduleId}
      className="block group"
    >
      <div
        className={`bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4 h-full`}
      >
        {/* Header: Image & Basic Info */}
        <div className="flex items-start gap-4">
          {/* Event Image */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src={event.image ?? "/placeholder.jpg"}
              alt={event.name}
              width={960}
              height={960}
              className={`w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300`}
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between mb-1 items-start">
              <h3 className="font-semibold text-gray-900 text-md md:text-lg truncate pr-2">
                {event.name}
              </h3>
              <span
                className={`${
                  event.isEnded
                    ? "bg-[#ffd0ce] text-[#2a2c2c]"
                    : "bg-[#D1FAE5] text-[#0A484D]"
                } text-xs md:text-sm px-2 py-1 rounded-full  font-medium shrink-0`}
              >
                {event.isEnded ? "Encerrado" : "Ativo"}
              </span>
            </div>
            <div className="flex flex-col items-start gap-1 text-xs md:text-sm text-gray-500">
              <div className="flex gap-2">
                <Calendar size={14} />
                <span>
                  {new Date(event.startsAt).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <div className="flex gap-2">
                <MapPin size={14} />
                <span className="truncate">{event.localization}</span>
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
              <span>{formatCurrency(event.data.ordersValueTotal)}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-normal">
                {`Ontem: ${formatCurrency(event.data.ordersValueYesterday)}`}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-normal">
                {`Hoje: ${formatCurrency(event.data.ordersValueToday)}`}
              </span>
            </div>
          </div>

          {/* Ingressos */}
          <div>
            <p className="text-[10px] md:text-xs text-gray-600 uppercase font-medium mb-0.5">
              Ingressos
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#0A484D] font-bold">
              <span>{event.data.ticketsSold}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-normal">
                {`Ontem: ${Math.floor((event.data.ticketsToday || 0) * 0.8)}`}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-normal">
                {`Hoje: ${event.data.ticketsYesterday || 0}`}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-normal">
                {`Cortesias: ${event.data.ticketsCortesies || 0}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
