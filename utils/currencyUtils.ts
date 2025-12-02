/**
 * Utilities for currency formatting in Brazilian Real (R$)
 */

export interface CurrencyFormatOptions {
  /**
   * Number of decimal places to show
   * @default 2
   */
  decimals?: number;

  /**
   * Whether to show the currency symbol (R$)
   * @default true
   */
  showSymbol?: boolean;
}

/**
 * Formats a numeric value as Brazilian Real currency
 * Values are expected to be in cents and will be divided by 100 before formatting
 * @param value - The numeric value in cents
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, options: CurrencyFormatOptions = {}): string => {
  const { decimals = 2, showSymbol = true } = options;

  // Always divide by 100 since values come in cents
  const adjustedValue = value / 100;

  if (showSymbol) {
    // Use currency formatting when symbol should be shown
    return adjustedValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  } else {
    // Format the number without currency symbol
    return adjustedValue.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
};
