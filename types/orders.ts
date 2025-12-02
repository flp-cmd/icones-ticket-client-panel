import { TableFilters } from '@/contexts/TableContext';

export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DELIVERED = 'delivered',
  DECLINED = 'declined',
  CANCELED = 'canceled',
}

export enum OrderOrigin {
  SITE = 'web',
  SALE_POINT = 'sale-point',
  COURTESY = 'courtesy',
  PANEL = 'panel',
  CAMPAIGN = 'campaign',
}

export enum PaymentMethod {
  UNKNOWN = 'unknown',
  CREDIT = 'credit',
  DEBIT = 'debit',
  PIX = 'pix',
  MONEY = 'money',
}

export enum OrderHistoryEvent {
  ORDER_CREATED = 'orderCreated',
  ORDER_PAID = 'orderPaid',
  TICKET_SEEN = 'ticketSeen',
  TICKET_VALIDATED = 'ticketValidated',
  TICKET_CANCELLED = 'ticketCancelled',
  CUSTOMER_CREATED = 'customerCreated',
}

import { Ticket } from './tickets';
import { Localization } from './localization';

export enum OrderTableViewMode {
  OVERVIEW = 'overview',
  PAYMENT = 'payment',
  INVESTIGATIVE = 'investigative',
  COMPLETE = 'complete',
}

export interface OrderHistoryItem {
  event: OrderHistoryEvent;
  date: string;
  details?: string;
}

export interface OrderHistoryResponse {
  items: OrderHistoryItem[];
  total: number;
  page: number;
  perPage: number;
}

export interface EventSimpleData {
  eventId: number;
  name: string;
  scheduleId: number;
  startsAt: string;
}

export interface OrderSalePoint {
  salePointId: number;
  terminalImei: string;
  terminalSerialNumber: string;
  username: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  localization?: Localization;
}

export interface OrderUserCustomer {
  userId: number;
  createdAt: string;
  email: string;
  documentNumber: string;
  name: string;
  phone: string;
  active: boolean;
  twoFactorEnabled: boolean;
  emailValidated: boolean;
}

export interface OrderEvent {
  eventId: number;
  name: string;
  localization: string;
  city: string;
  scheduleId: number;
  startsAt: string;
  openingAt: string;
  ageRating: string;
  address: string;
}

export interface OrderCoupon {
  couponCodeId: number;
  code?: string;
}

export interface Order {
  orderId: number;
  status: OrderStatus;
  price: number;
  grossPrice: number;
  feeValue: number;
  interestValue: number;
  discountValue: number;
  origin: OrderOrigin;
  createdAt: string;
  updatedAt: string;
  totalTickets: number;
  userId?: number;
  userEmail?: string;
  buyerIdentifier?: string;
  paymentMethod: PaymentMethod;
  paymentInstallments: number;
  paymentProviderName: string;
  tickets?: Ticket[];
  event?: OrderEvent;
  salePoint?: OrderSalePoint;
  customer?: OrderUserCustomer;
  hasFile?: boolean;
  ip?: string;
  chargebackRequested: boolean;
  referenceId: string;
  paymentExternalId: string;
  coupon: OrderCoupon;
}

export interface OrderFilters extends TableFilters {
  orderId?: string;
  status?: OrderStatus;
  eventId?: string;
  scheduleId?: string;
  eventName?: string;
  date?: string;
  documentNumber?: string;
  customerEmail?: string;
  customerId?: string;
  origin?: OrderOrigin;
  totalTickets?: string;
  paymentMethod?: PaymentMethod;
  salePointId?: string;
}

export interface OrderListParams {
  page?: number;
  perPage?: number;
  orderId?: string;
  userId?: number;
  status?: OrderStatus;
  scheduleId?: string;
  date?: string;
  buyerIdentifier?: string;
  email?: string;
  origin?: OrderOrigin;
  tickets?: string;
  paymentMethod?: PaymentMethod;
  salePointId?: string;
}
