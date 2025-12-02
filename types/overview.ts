import { ActiveStatus } from './common';
import { TableFilters } from '@/contexts/TableContext';

// Overview Statistics Types
export interface OverviewStatistics {
  ticketsYesterday: number;
  ticketsToday: number;
  courtesiesYesterday: number;
  courtesiesToday: number;
  revenuesYesterday: number;
  revenuesToday: number;
  feesYesterday: number;
  feesToday: number;
  eventsPast: number;
  eventsFuture: number;
}

// Event Data Types
export interface EventData {
  ticketsTotal: number;
  ticketsSold: number;
  ticketsCortesies: number;
  ticketsYesterday: number;
  ticketsToday: number;
  ordersItemsTotal: number;
  ordersItemsYesterday: number;
  ordersItemsToday: number;
  ordersValueTotal: number;
  ordersValueYesterday: number;
  ordersValueToday: number;
}

// Overview Event Types
export interface OverviewEvent extends ActiveStatus {
  eventId: number;
  slug: string;
  name: string;
  image: string;
  localization: string;
  city: string;
  scheduleId: number;
  startsAt: string;
  isEnded: boolean;
  salesStartsAt: string;
  revenueTarget: number;
  isPassport: boolean;
  data: EventData;
}

export enum EventStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  DRAFT = 'draft',
}

export interface OverviewEventFilters extends TableFilters {
  name?: string;
  city?: string;
  state?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OverviewEventListParams {
  page?: number;
  perPage?: number;
  name?: string;
  city?: string;
  state?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OverviewEventListResponse {
  items: OverviewEvent[];
  total: number;
  page: number;
  perPage: number;
}

// Overview Filter Types
export interface OverviewFilters {
  dateRange?: {
    from: string;
    to: string;
  };
  eventStatus?: EventStatus;
  city?: string;
  state?: string;
}
