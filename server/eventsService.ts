import { httpService } from './httpService';
import { Event, EventSeatsType } from '@/types/events';
import { PaginatedResponse } from '@/types/common';
import { buildQueryParams } from '@/utils/apiUtils';
import {
  EventListParams,
  EventListItem,
  SeatsioChart,
  MapConfigRequest,
  EventGeneralUpdateRequest,
  EventOnlineSalesUpdateRequest,
  EventCategoriesUpdateRequest,
  EventLocalizationUpdateRequest,
  EventScheduleCreateRequest,
  EventScheduleUpdateRequest,
  EventScheduleDatesUpdateRequest,
  EventScheduleTicketsUpdateRequest,
  EventSchedulePaymentOptionsUpdateRequest,
  EventSchedule,
  EventScheduleContractResponse,
  EventScheduleContractCreateRequest,
} from '@/types/events';

export const eventsService = {
  getEventById: async (eventId: number): Promise<Event> => {
    const url = `/panel/admin/events/${eventId}`;
    return httpService.get<Event>(url);
  },

  getEvents: async (params: EventListParams = {}): Promise<PaginatedResponse<EventListItem>> => {
    const queryString = buildQueryParams(params);
    const url = `/panel/admin/events${queryString}`;
    return httpService.get<PaginatedResponse<EventListItem>>(url);
  },

  createEvent: async (name: string): Promise<Event> => {
    const url = `/panel/admin/events`;
    return httpService.post<Event>(url, { name });
  },

  activate: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/activate`;
    return httpService.post<void>(url);
  },

  pause: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/pause`;
    return httpService.post<void>(url);
  },

  delete: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}`;
    return httpService.delete<void>(url);
  },

  cancel: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/cancel`;
    return httpService.post<void>(url);
  },

  toggleOnlineSalesActive: async (eventId: number, active: boolean): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/online-sales-active`;
    return httpService.post<void>(url, { active });
  },

  toggleOnlineSalesVisible: async (eventId: number, active: boolean): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/online-sales-visible`;
    return httpService.post<void>(url, { active });
  },

  getSeatsioCharts: async (): Promise<SeatsioChart[]> => {
    const url = `/panel/admin/events/seatsio/charts`;
    return httpService.get<SeatsioChart[]>(url);
  },

  getSeatsioChart: async (chartId: string): Promise<SeatsioChart> => {
    const url = `/panel/admin/events/seatsio/charts/${chartId}`;
    return httpService.get<SeatsioChart>(url);
  },

  updateMapConfig: async (eventId: number, seatsType: EventSeatsType, seatsioChartKey?: string): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/seats-type`;
    const request: MapConfigRequest = { seatsType, seatsioChartKey };
    return httpService.patch<void>(url, request);
  },

  updateGeneral: async (eventId: number, data: EventGeneralUpdateRequest): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/general`;
    return httpService.patch<void>(url, data);
  },

  uploadMapImage: async (eventId: number, file: File): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/map-image`;
    const formData = new FormData();
    formData.append('file', file);
    return httpService.axiosInstance
      .post<void>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  deleteMapImage: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/map-image`;
    return httpService.delete<void>(url);
  },

  uploadImage: async (eventId: number, file: File): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/image`;
    const formData = new FormData();
    formData.append('file', file);
    return httpService.axiosInstance
      .post<void>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  deleteImage: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/image`;
    return httpService.delete<void>(url);
  },

  uploadImagePreview: async (eventId: number, file: File): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/image-preview`;
    const formData = new FormData();
    formData.append('file', file);
    return httpService.axiosInstance
      .post<void>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  deleteImagePreview: async (eventId: number): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/image-preview`;
    return httpService.delete<void>(url);
  },

  updateOnlineSales: async (eventId: number, data: EventOnlineSalesUpdateRequest): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/online-sales`;
    return httpService.patch<void>(url, data);
  },

  updateCategories: async (eventId: number, data: EventCategoriesUpdateRequest): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/categories`;
    return httpService.patch<void>(url, data);
  },

  updateProducer: async (eventId: number, producerId: number | null): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/producer`;
    return httpService.patch<void>(url, { producerId });
  },

  updateLocalization: async (eventId: number, data: EventLocalizationUpdateRequest): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/localization`;
    return httpService.patch<void>(url, data);
  },

  createSchedule: async (eventId: number, data: EventScheduleCreateRequest): Promise<EventSchedule> => {
    const url = `/panel/admin/events/${eventId}/schedules`;
    return httpService.post<EventSchedule>(url, data);
  },

  updateSchedule: async (eventId: number, scheduleId: number, data: EventScheduleUpdateRequest): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/schedules/${scheduleId}`;
    return httpService.patch<void>(url, data);
  },

  updateScheduleDates: async (
    eventId: number,
    scheduleId: number,
    data: EventScheduleDatesUpdateRequest
  ): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/schedules/${scheduleId}/dates`;
    return httpService.patch<void>(url, data);
  },

  updateScheduleTickets: async (
    eventId: number,
    scheduleId: number,
    data: EventScheduleTicketsUpdateRequest
  ): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/schedules/${scheduleId}/tickets`;
    return httpService.patch<void>(url, data);
  },

  updateSchedulePaymentOptions: async (
    eventId: number,
    scheduleId: number,
    data: EventSchedulePaymentOptionsUpdateRequest
  ): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/schedules/${scheduleId}/payment-options`;
    return httpService.patch<void>(url, data);
  },

  getScheduleContract: async (eventId: number, scheduleId: number): Promise<EventScheduleContractResponse> => {
    const url = `/panel/admin/events/${eventId}/schedules/${scheduleId}/contract`;
    return httpService.get<EventScheduleContractResponse>(url);
  },

  createScheduleContract: async (
    eventId: number,
    scheduleId: number,
    data: EventScheduleContractCreateRequest
  ): Promise<void> => {
    const url = `/panel/admin/events/${eventId}/schedules/${scheduleId}/contract`;
    return httpService.post<void>(url, data);
  },
};
