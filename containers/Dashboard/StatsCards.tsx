import StatCard from "@/components/cards/StatCard";
import { DollarSign, Ticket } from "lucide-react";

interface IProps {
  isLoading: boolean;
  revenuesToday: number;
  revenuesYesterday: number;
  ticketsToday: number;
  ticketsYesterday: number;
}

export default function StatsCards({
  isLoading,
  revenuesToday,
  revenuesYesterday,
  ticketsToday,
  ticketsYesterday,
}: IProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <StatCard
        yesterdayValue={revenuesYesterday}
        todayValue={revenuesToday}
        title="Faturamento Hoje"
        icon={<DollarSign color="#0A484D" size={16} />}
        isRevenue
        isLoading={isLoading}
      />

      <StatCard
        yesterdayValue={ticketsYesterday}
        todayValue={ticketsToday}
        title="Ingressos Vendidos Hoje"
        icon={<Ticket color="#0A484D" size={16} />}
        isLoading={isLoading}
      />
    </div>
  );
}
