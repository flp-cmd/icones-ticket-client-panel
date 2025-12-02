import { TableFilters } from '@/contexts/TableContext';

// Ticket status enum
export enum TicketStatus {
  ACTIVE = 'active',
  VALIDATED = 'validated',
  CANCELLED = 'cancelled',
}

// Seat type enum
export enum SeatType {
  Full = 'full',
  Benefit = 'benefit',
  Courtesy = 'courtesy',
  Custom = 'custom',
  Passport = 'passport',
}

// Ticket table view mode enum
export enum TicketTableViewMode {
  OVERVIEW = 'overview',
  CUSTOMER = 'customer',
  COMPLETE = 'complete',
}

// Panel event response interface
export interface PanelEventResponseDto {
  eventId: number;
  name: string;
  scheduleId: number;
  startsAt: string;
  endsAt?: string;
  location?: string;
  city?: string;
  state?: string;
}

// Ticket interface
export interface Ticket {
  createdAt: string;
  code: string;
  hasFile: boolean;
  sectorKey: string;
  sectorName?: string;
  seatId?: string;
  seatType: SeatType;
  seatName: string;
  status: TicketStatus;
  validatedAt?: string;
  cancelledAt?: string;
  validatedReader?: string;
  buyerIdentifier?: string;
  orderId?: number;
  userId?: number;
  event?: PanelEventResponseDto;
}

export interface TicketFilters extends TableFilters {
  code?: string;
  status?: TicketStatus;
  seatType?: string;
  eventName?: string;
  buyerIdentifier?: string;
  orderId?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface TicketListParams {
  page?: number;
  perPage?: number;
  code?: string;
  userId?: string;
  buyerIdentifier?: string;
  sectorKey?: string;
  seatId?: string;
  status?: string;
  date?: string;
  scheduleId?: string;
}
