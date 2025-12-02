import { OrderTableViewMode } from '@/types/orders';

// URL values in Portuguese
const URL_VALUES = {
  OVERVIEW: 'visao-geral',
  PAYMENT: 'financeiro',
  INVESTIGATIVE: 'investigativo',
  COMPLETE: 'completo',
} as const;

// Mapping from Portuguese URL values to English enum values
const VIEW_MODE_URL_MAPPING: Record<string, OrderTableViewMode> = {
  [URL_VALUES.OVERVIEW]: OrderTableViewMode.OVERVIEW,
  [URL_VALUES.PAYMENT]: OrderTableViewMode.PAYMENT,
  [URL_VALUES.INVESTIGATIVE]: OrderTableViewMode.INVESTIGATIVE,
  [URL_VALUES.COMPLETE]: OrderTableViewMode.COMPLETE,
};

// Mapping from English enum values to Portuguese URL values
const VIEW_MODE_ENUM_TO_URL: Record<OrderTableViewMode, string> = {
  [OrderTableViewMode.OVERVIEW]: URL_VALUES.OVERVIEW,
  [OrderTableViewMode.PAYMENT]: URL_VALUES.PAYMENT,
  [OrderTableViewMode.INVESTIGATIVE]: URL_VALUES.INVESTIGATIVE,
  [OrderTableViewMode.COMPLETE]: URL_VALUES.COMPLETE,
};

/**
 * Converts Portuguese URL value to OrderTableViewMode enum
 */
export function getViewModeFromUrl(urlValue: string | null): OrderTableViewMode {
  if (!urlValue) {
    return OrderTableViewMode.OVERVIEW;
  }

  const mappedValue = VIEW_MODE_URL_MAPPING[urlValue];
  if (mappedValue) {
    return mappedValue;
  }

  // Fallback: try to use the URL value directly if it's a valid enum value
  if (Object.values(OrderTableViewMode).includes(urlValue as OrderTableViewMode)) {
    return urlValue as OrderTableViewMode;
  }

  return OrderTableViewMode.OVERVIEW;
}

/**
 * Converts OrderTableViewMode enum to Portuguese URL value
 */
export function getViewModeUrlValue(viewMode: OrderTableViewMode): string {
  return VIEW_MODE_ENUM_TO_URL[viewMode];
}

/**
 * Gets all available Portuguese URL values
 */
export function getAvailableViewModeUrlValues(): string[] {
  return Object.values(VIEW_MODE_ENUM_TO_URL);
}
