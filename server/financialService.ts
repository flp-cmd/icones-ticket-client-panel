import {
  FinancialMonthlyReport,
  AddMonthlyFixedItemPayload,
  UpdateMonthlyFixedItemPayload,
} from "@/types/financial";
import { httpService } from "./httpService";

class FinancialService {
  async getMonthlyReport(
    month: number,
    year: number
  ): Promise<FinancialMonthlyReport> {
    return httpService.get<FinancialMonthlyReport>(
      `/panel/finances/monthly-report?month=${month}&year=${year}`
    );
  }

  async addMonthlyFixedItem(
    type: "revenue" | "cost",
    payload: AddMonthlyFixedItemPayload
  ): Promise<void> {
    return httpService.post<void>(
      `/panel/finances/monthly-fixed/type/${type}`,
      payload
    );
  }

  async updateMonthlyFixedItem(
    recordId: number,
    payload: UpdateMonthlyFixedItemPayload
  ): Promise<void> {
    return httpService.put<void>(
      `/panel/finances/monthly-fixed/${recordId}`,
      payload
    );
  }

  async deleteMonthlyFixedItem(recordId: number): Promise<void> {
    return httpService.delete<void>(
      `/panel/finances/monthly-fixed/${recordId}`
    );
  }
}

export const financialService = new FinancialService();
