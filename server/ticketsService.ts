import { httpService } from './httpService';
import { Ticket, TicketListParams } from '@/types/tickets';
import { PaginatedResponse } from '@/types/common';
import { buildQueryParams } from '@/utils/apiUtils';

export const ticketsService = {
  getTickets: async (params: TicketListParams = {}): Promise<PaginatedResponse<Ticket>> => {
    const queryString = buildQueryParams(params);
    const url = `/panel/tickets${queryString}`;

    return httpService.get<PaginatedResponse<Ticket>>(url);
  },

  getUserTickets: async (
    userId: number,
    params: Omit<TicketListParams, 'userId'> = {}
  ): Promise<PaginatedResponse<Ticket>> => {
    return ticketsService.getTickets({ ...params, userId: userId.toString() });
  },

  downloadTicket: async (ticketCode: string): Promise<Blob> => {
    const url = `/panel/tickets/${ticketCode}/file`;
    const response = await httpService.axiosInstance.get(url, {
      responseType: 'blob',
    });
    return response.data;
  },
};
