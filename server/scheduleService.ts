import { httpService } from "./httpService";
import { PaginatedResponse } from "@/types/common";
import { EventListParams, EventSchedule } from "@/types/events";
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
}

export const scheduleService = new ScheduleService();
