import { httpService } from './httpService';
import { Order, OrderListParams, OrderHistoryResponse } from '@/types/orders';
import { PaginatedResponse } from '@/types/common';
import { buildQueryParams } from '@/utils/apiUtils';
import { EventFilterItem } from '@/types/events';
import { SalePointItem } from '@/types/salePoints';

export const ordersService = {
  getOrders: async (params: OrderListParams = {}): Promise<PaginatedResponse<Order>> => {
    const queryString = buildQueryParams(params);
    const url = `/panel/orders${queryString}`;

    return httpService.get<PaginatedResponse<Order>>(url);
  },

  getOrderById: async (orderId: number): Promise<Order> => {
    const url = `/panel/orders/${orderId}`;
    return httpService.get<Order>(url);
  },

  getOrderHistory: async (
    orderId: number,
    params: { page?: number; perPage?: number } = {}
  ): Promise<OrderHistoryResponse> => {
    const queryString = buildQueryParams(params);
    const url = `/panel/orders/${orderId}/history${queryString}`;

    return httpService.get<OrderHistoryResponse>(url);
  },

  cancelOrder: async (orderId: number): Promise<void> => {
    const url = `/panel/orders/${orderId}/cancel`;
    return httpService.post<void>(url);
  },

  softCancelOrder: async (orderId: number): Promise<void> => {
    const url = `/panel/orders/${orderId}/soft-cancel`;
    return httpService.post<void>(url);
  },

  setChargeback: async (orderId: number): Promise<void> => {
    const url = `/panel/orders/${orderId}/chargeback`;
    return httpService.post<void>(url);
  },

  getEventFilterList: async (
    params: { page?: number; perPage?: number; name?: string } = {}
  ): Promise<PaginatedResponse<EventFilterItem>> => {
    const queryString = buildQueryParams(params);
    const url = `/panel/events/filter-list${queryString}`;

    return httpService.get<PaginatedResponse<EventFilterItem>>(url);
  },

  getSalePointsBySchedule: async (
    scheduleId: number,
    params: { page?: number; perPage?: number } = {}
  ): Promise<PaginatedResponse<SalePointItem>> => {
    const queryString = buildQueryParams(params);
    const url = `/panel/sale-points/schedules/${scheduleId}${queryString}`;

    return httpService.get<PaginatedResponse<SalePointItem>>(url);
  },
};
