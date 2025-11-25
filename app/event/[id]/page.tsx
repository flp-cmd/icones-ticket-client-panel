import { MOCK_EVENTS } from "../../data/mocks";
import Link from "next/link";

import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = MOCK_EVENTS.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const percentage = Math.round(
    (event.metrics.revenueCurrent / event.metrics.revenueGoal) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 space-y-6">
        {/* Header with Back Button */}
        <div className="space-y-2">
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
            <span className="text-sm font-medium">Voltar</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">{event.title}</h1>
          <p className="text-sm text-gray-500">
            {event.date} • {event.location}
          </p>
        </div>

        {/* Revenue Goal Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="text-blue-500">
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
            <button className="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
              Alterar
            </button>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>
              R${" "}
              {event.metrics.revenueCurrent.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}{" "}
              / R${" "}
              {event.metrics.revenueGoal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-blue-600 font-bold">{percentage}%</span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${Math.min(percentage, 100)}%` }}
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
                {event.ticketsSold.toLocaleString("pt-BR")}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Pagantes</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto mr-8">
                    {(
                      event.ticketsSold - event.metrics.cortesias
                    ).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-gray-600">Cortesias</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto mr-8">
                    {event.metrics.cortesias.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Donut Chart */}
            <div className="relative w-32 h-32 shrink-0">
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
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${
                    ((event.ticketsSold - event.metrics.cortesias) /
                      event.ticketsSold) *
                    251.2
                  } 251.2`}
                  strokeLinecap="round"
                />
                {/* Cortesias segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="8"
                  strokeDasharray={`${
                    (event.metrics.cortesias / event.ticketsSold) * 251.2
                  } 251.2`}
                  strokeDashoffset={`-${
                    ((event.ticketsSold - event.metrics.cortesias) /
                      event.ticketsSold) *
                    251.2
                  }`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Vendas por Setor */}
        {event.sectors.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-800">
              Vendas por Setor
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
              {event.sectors.map((sector) => (
                <div key={sector.name}>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm text-gray-800">{sector.name}</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {sector.sold}/{sector.total}
                      </div>
                      <div className="text-xs text-gray-400">
                        R${" "}
                        {sector.revenue.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          (sector.sold / sector.total) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Validação por Setor */}
        {event.sectors.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-800">
              Validação por Setor
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
              {event.sectors.map((sector) => {
                const percentage = Math.round(
                  (sector.validated / sector.sold) * 100
                );
                return (
                  <div key={sector.name}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm text-gray-800">
                        {sector.name}
                      </span>
                      <div className="text-xs text-gray-500">
                        {sector.validated}/{sector.sold} ({percentage}%)
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
