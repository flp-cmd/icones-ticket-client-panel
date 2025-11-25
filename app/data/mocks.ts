export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  revenue: number;
  ticketsSold: number;
  ticketsTotal: number;
  image: string; // Placeholder color or url
  status: "active" | "past";
  metrics: {
    revenueGoal: number;
    revenueCurrent: number;
    ticketsSoldToday: number;
    cortesias: number;
    validated: number;
  };
  sectors: {
    name: string;
    sold: number;
    total: number;
    revenue: number;
    validated: number;
  }[];
  dailyRevenue: {
    date: string;
    amount: number;
  }[];
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Delacruz | Tour Vinho",
    date: "28 Nov 2025",
    location: "São José dos Campos - SP",
    revenue: 245800,
    ticketsSold: 1523,
    ticketsTotal: 5000,
    image: "/delacruz.png",
    status: "active",
    metrics: {
      revenueGoal: 300000,
      revenueCurrent: 245800,
      ticketsSoldToday: 208,
      cortesias: 47,
      validated: 368,
    },
    sectors: [
      { name: "Pista", sold: 892, total: 1000, revenue: 89200, validated: 245 },
      {
        name: "Camarote",
        sold: 156,
        total: 200,
        revenue: 93600,
        validated: 89,
      },
      { name: "VIP", sold: 78, total: 100, revenue: 62400, validated: 34 },
    ],
    dailyRevenue: [
      { date: "20 Nov", amount: 15400 },
      { date: "21 Nov", amount: 22800 },
      { date: "22 Nov", amount: 31200 },
      { date: "23 Nov", amount: 28900 },
      { date: "24 Nov", amount: 35600 },
    ],
  },
  {
    id: "2",
    title: "Um Baita Festival",
    date: "20 Dez 2025",
    location: "Rio de Janeiro - RJ",
    revenue: 89500,
    ticketsSold: 456,
    ticketsTotal: 1000,
    image: "/baita.png",
    status: "active",
    metrics: {
      revenueGoal: 100000,
      revenueCurrent: 89500,
      ticketsSoldToday: 45,
      cortesias: 12,
      validated: 0,
    },
    sectors: [],
    dailyRevenue: [],
  },
];

export const MOCK_USER = {
  name: "João Silva",
  company: "JS Produções",
  email: "joao.silva@eventos.com",
  phone: "(11) 99999-9999",
  cpfCnpj: "12.345.678/0001-90",
  memberSince: "15 Jan 2024",
  initials: "JS",
};

export const MOCK_DASHBOARD_STATS = {
  totalRevenue: 513600,
  totalTickets: 2871,
};
