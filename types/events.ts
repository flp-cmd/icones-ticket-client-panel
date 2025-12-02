import { LocalizationAvailable } from './localization';
import { TableFilters } from '@/contexts/TableContext';
import { CategoryAvailable } from './categories';
import { Producer } from './producers';

export interface EventFilterItem {
  eventId: number;
  scheduleId: number;
  name: string;
  startsAt: string;
  localization: string;
  city: string;
}

export enum EventStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum EventSeatsType {
  UNMARKED = 'unmarked',
  SEATSIO = 'seatsio',
}

export interface Event {
  eventId: number;
  slug: string;
  name: string;
  seatsType: EventSeatsType;
  seatsioChartKey?: string;
  description?: string;
  ageRating?: string;
  image?: string;
  imagePreview?: string;
  mapImage?: string;
  status: EventStatus;
  onlineSalesActive: boolean;
  onlineSalesVisible: boolean;
  onlineSalesFeatured?: boolean;
  onlineSalesPriority?: number;
  localization?: LocalizationAvailable;
  schedules?: EventSchedule[];
  categories?: CategoryAvailable[];
  producer?: Producer;
  createdAt: Date;
}

export interface EventSchedule {
  scheduleId: number;
  isActive: boolean;
  subtitle?: string;
  startsAt: string;
  openingAt?: string;
  endsAt: string;
  salesStartsAt?: string;
  paymentOptions?: EventSchedulePaymentOptions;
  hasContract: boolean;
  benefitEnabled: boolean;
  benefitPercentage: number;
  ticketsPerUser?: number;
  createdAt: string;
}

export interface EventSchedulePaymentOptions {
  pix: {
    active: boolean;
  };
  credit: {
    active: boolean;
    maxInstallments: number;
    maxInstallmentsNoInterest: number;
  };
}

export interface EventListItem {
  eventId: number;
  name: string;
  status: EventStatus;
  image?: string;
  localizationName?: string;
  cityName?: string;
  schedules: {
    scheduleId: number;
    startsAt: string;
    subtitle?: string;
    isActive: boolean;
  }[];
}

export enum EventSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface EventFilters extends TableFilters {
  searchQuery?: string;
  status?: EventStatus;
  orderBySort?: string; // Combined value for UI (e.g., "name_asc", "date_desc")
  orderBy?: string; // For API
  sort?: EventSort; // For API
}

export interface EventListParams {
  page?: number;
  perPage?: number;
  searchQuery?: string;
  status?: EventStatus;
  orderBy?: string;
  sort?: EventSort;
}

export interface SeatsioChart {
  key: string;
  name: string;
  imageUrl: string;
}

export interface MapConfigRequest {
  seatsType: EventSeatsType;
  seatsioChartKey?: string;
}

export interface EventGeneralUpdateRequest {
  name: string;
  description?: string;
  ageRating?: string;
}

export interface EventOnlineSalesUpdateRequest {
  featured: boolean;
  priority?: number;
}

export interface EventCategoriesUpdateRequest {
  categoryIds: number[];
}

export interface EventLocalizationUpdateRequest {
  localizationId: number | null;
}

export interface EventScheduleCreateRequest {
  subtitle?: string;
  startsAt: string;
  endsAt: string;
}

export interface EventScheduleUpdateRequest {
  subtitle?: string | null;
}

export interface EventScheduleDatesUpdateRequest {
  startsAt: string;
  openingAt: string;
  endsAt: string;
  salesStartsAt?: string;
}

export interface EventScheduleTicketsUpdateRequest {
  ticketsPerUser?: number | null;
  benefitEnabled: boolean;
  ticketsBenefitPct?: number;
}

export interface EventSchedulePaymentOptionsUpdateRequest {
  pix: {
    active: boolean;
  };
  credit: {
    active: boolean;
    maxInstallments?: number;
    maxInstallmentsNoInterest?: number;
  };
}

export interface EventScheduleFinanceContractPaymentTaxes {
  credit?: number;
  debit?: number;
  pix?: number;
  money?: number;
}

export interface EventScheduleFinanceContract {
  site: {
    service: number;
    feePercentage: number;
    feeTicketUnit: number;
  };
  salePoints: {
    service: number;
    feeBelongsProducer: boolean;
    taxesGeneralPercentage: number;
    taxesPaymentsPercentage: EventScheduleFinanceContractPaymentTaxes;
  };
  tickets: {
    soldCostUnit: number;
    courteyCostUnit: number;
    canceledCostUnit: number;
  };
  rebate: {
    percentageDisplay: string;
    percentage: number;
    taxationEnable: boolean;
    taxationPercentage: number;
    siteTaxesEnable: boolean;
    siteTaxesGeneralPercentage: number;
    siteTaxesPaymentsPercentage: EventScheduleFinanceContractPaymentTaxes;
  };
}

export interface EventScheduleContractAvailable {
  contractId: number;
  name: string;
  description?: string;
  rebatePercentage: number;
  rebateTaxationEnable: boolean;
  rebateSiteTaxesEnable: boolean;
  siteFeePercentage: number;
}

export interface EventScheduleContractResponse {
  hasContract: boolean;
  contract?: EventScheduleFinanceContract;
  availableContracts?: EventScheduleContractAvailable[];
}

export interface EventScheduleContractCreateRequest {
  contractId: number;
}
