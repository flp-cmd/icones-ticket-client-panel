"use client";

import { BadgeInfo, X } from "lucide-react";
import Link from "next/link";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { scheduleService } from "@/server/scheduleService";
import { formatCurrency } from "@/utils/currencyUtils";
import { useMemo, useState } from "react";
import Loading from "@/components/feedback/Loading";

interface Props {
  scheduleId: string;
}

export default function EventDashboardContainer({ scheduleId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRevenueTarget, setNewRevenueTarget] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["event", scheduleId],
    queryFn: () => scheduleService.getScheduleById(scheduleId),
  });

  const updateRevenueTargetMutation = useMutation({
    mutationFn: (revenueTarget: number) =>
      scheduleService.updateRevenueTarget(scheduleId, revenueTarget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", scheduleId] });
      setIsModalOpen(false);
      setNewRevenueTarget("");
    },
  });

  const { data: validationData, isLoading: isLoadingValidation } = useQuery({
    queryKey: ["event", scheduleId, "validation"],
    queryFn: () => scheduleService.getScheduleValidation(scheduleId),
  });

  const { data: resumeData, isLoading: isLoadingResume } = useQuery({
    queryKey: ["event", scheduleId, "resume"],
    queryFn: () => scheduleService.getScheduleResume(scheduleId),
  });

  const isPageLoading = isLoading || isLoadingValidation || isLoadingResume;

  const ordersTotalValue = data?.ordersTotalValue ?? 0;
  const revenueTarget = data?.revenueTarget ?? 0;
  const ticketsSold = data?.ticketsTotal ?? 0;
  const ticketsCourtesies = data?.totalCourtesies ?? 0;
  const title = data?.title ?? "";
  const localization = data?.localization ?? "";
  const date = data?.date ?? "";

  const sectors = validationData?.sectors ?? [];

  const ticketsToday = resumeData?.ticketsToday ?? 0;
  const ticketsYesterday = resumeData?.ticketsYesterday ?? 0;
  const ordersToday = resumeData?.ordersValueToday ?? 0;
  const ordersYesterday = resumeData?.ordersValueYesterday ?? 0;

  const percentage = useMemo(() => {
    if (revenueTarget > 0) {
      if (ordersTotalValue > revenueTarget) {
        return 100;
      } else {
        return Math.round((ordersTotalValue / revenueTarget) * 100);
      }
    }
    return 0;
  }, [ordersTotalValue, revenueTarget]);

  const COLORS = ["#0A484D", "#166e82", "#e3974f", "#2c3e50", "#987284"];

  const PRIMARY_COLOR = COLORS[1];
  const SECONDARY_COLOR = COLORS[2];
  const ACCENT_COLOR = COLORS[2];

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="space-y-2 md:hidden">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 mb-4 gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-sm font-medium">Meus Eventos</span>
        </Link>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">
          {date} • {localization}
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Faturamento Total */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium text-gray-800">
                Vendas Ontem
              </span>
              <BadgeInfo color="#0A484D" size={16} />
            </div>
          </div>
          <div className="text-xl font-bold text-[#0A484D]">
            {formatCurrency(ordersYesterday)} | {ticketsYesterday}
          </div>
        </div>
        {/* Ingressos Vendidos */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium text-gray-800">
                Vendas Hoje
              </span>
              <BadgeInfo color="#0A484D" size={16} />
            </div>
          </div>
          <div className="text-xl font-bold text-[#0A484D]">
            {formatCurrency(ordersToday)} | {ticketsToday}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {/* Revenue Goal Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div style={{ color: PRIMARY_COLOR }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">
                Meta de Faturamento
              </span>
            </div>
            <button
              onClick={() => {
                setNewRevenueTarget(revenueTarget.toString());
                setIsModalOpen(true);
              }}
              className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Alterar
            </button>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>
              {formatCurrency(ordersTotalValue)} /{" "}
              {formatCurrency(revenueTarget)}
            </span>
            <span className="font-bold" style={{ color: PRIMARY_COLOR }}>
              {percentage}%
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: PRIMARY_COLOR,
              }}
            ></div>
          </div>
        </div>

        {/* Público Confirmado Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-700 font-medium mb-4">Público Confirmado</h3>

          <div className="flex items-center justify-between">
            {/* Left side - Total and Legend */}
            <div className="flex-1">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {ticketsSold.toLocaleString("pt-BR")}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  ></div>
                  <span className="text-sm text-gray-600">Pagantes</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto mr-8">
                    {(ticketsSold - ticketsCourtesies).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                  ></div>
                  <span className="text-sm text-gray-600">Cortesias</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto mr-8">
                    {ticketsCourtesies.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Donut Chart */}
            <div className="relative w-32 h-32 justify-self-center md:justify-self-end">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                />
                {/* Pagantes segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={PRIMARY_COLOR}
                  strokeWidth="8"
                  strokeDasharray={`${
                    ((ticketsSold - ticketsCourtesies) / ticketsSold) * 251.2
                  } 251.2`}
                  strokeLinecap="round"
                />
                {/* Cortesias segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={SECONDARY_COLOR}
                  strokeWidth="8"
                  strokeDasharray={`${
                    (ticketsCourtesies / ticketsSold) * 251.2
                  } 251.2`}
                  strokeDashoffset={`-${
                    ((ticketsSold - ticketsCourtesies) / ticketsSold) * 251.2
                  }`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {sectors.length > 0 && (
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
          {/* Vendas por Setor */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-800">
              Vendas por Setor
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
              {sectors.map((sector) => (
                <div key={sector.name}>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm text-gray-800">{sector.name}</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {sector.created}/{sector.ticketsTotal}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatCurrency(sector.revenue)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          (sector.validated / sector.created) * 100,
                          100
                        )}%`,
                        backgroundColor: ACCENT_COLOR,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validação por Setor */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-800">
              Validação por Setor
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
              {sectors.map((sector) => {
                const percentage = Math.round(
                  (sector.validated / sector.created) * 100
                );
                return (
                  <div key={sector.name}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm text-gray-800">
                        {sector.name}
                      </span>
                      <div className="text-xs text-gray-500">
                        {sector.validated}/{sector.created} ({percentage}%)
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: PRIMARY_COLOR,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Alterar Meta de Faturamento
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = parseInt(newRevenueTarget, 10);
                if (!isNaN(value) && value >= 0) {
                  updateRevenueTargetMutation.mutate(value);
                }
              }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nova Meta
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formatCurrency(parseInt(newRevenueTarget) || 0)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setNewRevenueTarget(rawValue);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A484D] focus:border-transparent outline-none"
                placeholder="R$ 0,00"
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updateRevenueTargetMutation.isPending}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#0A484D] rounded-lg hover:bg-[#0A484D]/90 disabled:opacity-50"
                >
                  {updateRevenueTargetMutation.isPending ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
