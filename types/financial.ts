// FinancialMonthlyReport

export interface FinancialMonthlyEventOnline {
  fee: number;
  rebate: number;
  tax: number;
  gatewayFee: number;
  chargeback: number;
}

export interface FinancialMonthlyEventOffline {
  spreed: number;
  system: number;
  salePointFee: number;
  operational: number;
  others: number;
}

export interface FinancialMonthlyEventResult {
  totalRevenue: number;
  totalCost: number;
  profit: number;
}

export interface FinancialMonthlyEvent {
  scheduleId: number;
  date: string;
  name: string;
  city: string;
  startsAt: string;
  online: FinancialMonthlyEventOnline;
  offline: FinancialMonthlyEventOffline;
  result: FinancialMonthlyEventResult;
}

export interface FinancialMonthlyFixedItem {
  recordId: number;
  description: string;
  amount: number;
}

export interface FinancialMonthlySummary {
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
}

export interface FinancialMonthlyReport {
  month: number;
  year: number;
  summary: FinancialMonthlySummary;
  events: FinancialMonthlyEvent[];
  fixedRevenues: FinancialMonthlyFixedItem[];
  fixedCosts: FinancialMonthlyFixedItem[];
}

export interface UpdateMonthlyFixedItemPayload {
  description: string;
  amount: number;
}

export interface AddMonthlyFixedItemPayload extends UpdateMonthlyFixedItemPayload {
  month: number;
  year: number;
}
