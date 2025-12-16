"use client";

import { Calendar, SearchX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { overviewService } from "@/server/overviewService";
import StatsCards from "@/containers/Dashboard/StatsCards";
import { scheduleService } from "@/server/scheduleService";
import ScheduleCard from "@/components/cards/ScheduleCard";
import { useEffect, useState } from "react";
import Spinner from "@/components/feedback/Spinner";
import Pagination from "@/components/pagination/Pagination";
import { EventStatus } from "@/types/events";

export default function DashboardContainer() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<EventStatus | null>(null);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["schedule-stats"],
    queryFn: () => overviewService.getOverallStatistics(),
  });

  const {
    data: schedules,
    isLoading: schedulesLoading,
    refetch,
  } = useQuery({
    queryKey: ["schedule", page],
    queryFn: () =>
      scheduleService.getSchedules({
        page: page,
        status: status,
      }),
  });

  useEffect(() => {
    refetch();
  }, [status, refetch]);

  const revenuesToday = stats?.revenuesToday ?? 0;
  const revenuesYesterday = stats?.revenuesYesterday ?? 0;
  const ticketsToday = stats?.ticketsToday ?? 0;
  const ticketsYesterday = stats?.ticketsYesterday ?? 0;

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
      <StatsCards
        isLoading={statsLoading}
        revenuesToday={revenuesToday}
        revenuesYesterday={revenuesYesterday}
        ticketsToday={ticketsToday}
        ticketsYesterday={ticketsYesterday}
      />

      {/* Filters */}
      <div>
        <div className="flex flex-col gap-2 md:gap-4 mb-4">
          <h2 className="text-base font-medium text-gray-800 mb-3 md:mb-0">
            Meus Eventos
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => setStatus(null)}
              className={` px-3 py-1.5 rounded-lg text-sm transition-colors ${
                status === null
                  ? "bg-[#0A484D] text-white"
                  : "text-black bg-[#F8F9FA]"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatus(EventStatus.ACTIVE)}
              className={` px-3 py-1.5 rounded-lg text-sm transition-colors ${
                status === EventStatus.ACTIVE
                  ? "bg-[#0A484D] text-white"
                  : "text-black bg-[#F8F9FA]"
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setStatus(EventStatus.COMPLETED)}
              className={` px-3 py-1.5 rounded-lg text-sm transition-colors ${
                status === EventStatus.COMPLETED
                  ? "bg-[#0A484D] text-white"
                  : "text-black bg-[#F8F9FA]"
              }`}
            >
              Encerrados
            </button>
          </div>
        </div>
        {/* Schedules */}
        {schedulesLoading ? (
          <Spinner />
        ) : schedules?.items?.length == 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 pt-10">
            <SearchX size={40} />
            <p className="text-gray-600 text-2xl">Nenhum evento encontrado</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {schedules?.items?.map((event) => (
              <ScheduleCard key={event.scheduleId} event={event} />
            ))}
          </div>
        )}
        {/* Pagination */}
        {schedules && schedules.total > 0 && (
          <Pagination
            currentPage={page}
            totalItems={schedules.total}
            itemsPerPage={schedules.perPage}
            onPageChange={setPage}
            isLoading={schedulesLoading}
          />
        )}
      </div>
    </div>
  );
}
