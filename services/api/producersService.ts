import { httpService } from './httpService';
import { PaginatedResponse } from '@/types/common';
import { Producer, ProducerCreateRequest } from '@/types/producers';

class ProducersService {
  async getAvailableProducers(query: string): Promise<Producer[]> {
    const url = `/panel/admin/producers/available?search=${encodeURIComponent(query)}`;
    const response = await httpService.get<PaginatedResponse<Producer>>(url);
    return response.items;
  }

  async createProducer(data: ProducerCreateRequest): Promise<Producer> {
    const url = `/panel/admin/producers`;
    return httpService.post<Producer>(url, data);
  }
}

export const producersService = new ProducersService();
