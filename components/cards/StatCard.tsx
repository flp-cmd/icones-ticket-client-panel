import { formatCurrency } from "@/utils/currencyUtils";
import { TrendingUp, TrendingDown } from "lucide-react";
import Spinner from "../feedback/Spinner";

interface StatCardProps {
  yesterdayValue: number;
  todayValue: number;
  title: string;
  icon: React.ReactNode;
  isRevenue?: boolean;
  isLoading?: boolean;
}

export default function StatCard({
  yesterdayValue,
  todayValue,
  title,
  icon,
  isRevenue,
  isLoading,
}: StatCardProps) {
  const yesterdayValueFormatted = isRevenue
    ? formatCurrency(yesterdayValue)
    : yesterdayValue;

  const todayValueFormatted = isRevenue
    ? formatCurrency(todayValue)
    : todayValue;

  const isTodayValueGreater = todayValue >= yesterdayValue;
  const isTodayValueEqual = todayValue === yesterdayValue;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col gap-2">
      <div className="flex items-center gap-2 opacity-90">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-medium text-gray-800">{title}</span>
          {icon}
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="text-xl font-bold text-[#0A484D]">
            {todayValueFormatted}
          </div>
          <div className="flex items-center gap-1">
            <div className="text-xs font-medium text-gray-800">
              <div
                className={`flex items-center gap-2 ${
                  isTodayValueEqual
                    ? "text-gray-600"
                    : isTodayValueGreater
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {isTodayValueEqual ? null : isTodayValueGreater ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {`Ontem: ${yesterdayValueFormatted}`}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
