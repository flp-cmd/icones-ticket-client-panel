/**
 * Formats large numbers for display
 * @param num - The number to format
 * @returns Formatted string representation
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

/**
 * Formats IDs with thousands separators for better readability
 * @param id - The ID number to format
 * @returns Formatted ID string with dots as thousands separators
 */
export const formatId = (id: number): string => {
  return id.toLocaleString('pt-BR');
};

/**
 * Formats numbers with thousands separators for better readability
 * @param num - The number to format
 * @returns Formatted number string with dots as thousands separators
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('pt-BR');
};

/**
 * Formats a decimal value as percentage (e.g., 0.4 -> 40%)
 * @param value - The decimal value (0-1 range)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 0): string => {
  const percentage = value * 100;
  return `${percentage.toFixed(decimals)}%`;
};
