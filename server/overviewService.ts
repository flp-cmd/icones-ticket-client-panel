import { OverviewStatistics, OverviewEventListResponse, OverviewEventListParams } from '@/types/overview';
import { httpService } from './httpService';
import { buildQueryParams } from '@/utils/apiUtils';

class OverviewService {
  async getOverallStatistics(): Promise<OverviewStatistics> {
    return httpService.get<OverviewStatistics>('/panel/events/schedule/overall');
  }

  async getEvents(params: OverviewEventListParams): Promise<OverviewEventListResponse> {
    const queryString = buildQueryParams(params);
    const url = `/panel/events/schedule${queryString}`;

    return httpService.get<OverviewEventListResponse>(url);
  }
}

export const overviewService = new OverviewService();
