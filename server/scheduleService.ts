import { httpService } from "./httpService";
import { PaginatedResponse } from "@/types/common";
import {
  EventListParams,
  EventSchedule,
  EventScheduleResume,
  EventScheduleStatistics,
  EventScheduleTicketsValidation,
} from "@/types/events";
import { buildQueryParams } from "@/utils/apiUtils";

class ScheduleService {
  async getSchedules(
    params: EventListParams
  ): Promise<PaginatedResponse<EventSchedule>> {
    const queryString = buildQueryParams(params);
    return httpService.get<PaginatedResponse<EventSchedule>>(
      `/panel/client/events/schedule${queryString}`
    );
  }

  async getScheduleById(scheduleId: string): Promise<EventScheduleStatistics> {
    return httpService.get<EventScheduleStatistics>(
      `/panel/client/events/schedule/${scheduleId}`
    );
  }

  async getScheduleValidation(
    scheduleId: string
  ): Promise<EventScheduleTicketsValidation> {
    return httpService.get<EventScheduleTicketsValidation>(
      `/panel/client/events/schedules/${scheduleId}/tickets/validation`
    );
  }

  async getScheduleResume(scheduleId: string): Promise<EventScheduleResume> {
    return httpService.get<EventScheduleResume>(
      `/panel/client/events/schedules/${scheduleId}/resume`
    );
  }

  async updateRevenueTarget(scheduleId: string, value: number) {
    return httpService.post(
      `/panel/client/events/schedule/${scheduleId}/revenue-target`,
      { value }
    )
  }
}

export const scheduleService = new ScheduleService();
