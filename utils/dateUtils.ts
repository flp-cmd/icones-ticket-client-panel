/**
 * Utilities for date formatting in Brazilian Portuguese
 */

/**
 * Formats a month and year for display in Portuguese
 * @param month - Month (0-11)
 * @param year - Year
 * @returns Formatted string (e.g., "janeiro de 2024")
 */
export const formatMonthYear = (month: number, year: number): string => {
  const date = new Date(year, month);
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Returns an array with capitalized month names in Portuguese
 * @returns Array with month names (e.g., ["Janeiro", "Fevereiro", ...])
 */
export const getMonthNames = (): string[] => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
    months.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));
  }
  return months;
};

/**
 * Formats a complete date for display in Portuguese
 * @param date - Date to be formatted
 * @param options - Formatting options
 * @returns Formatted string
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj);
};

/**
 * Formats only the month for display in Portuguese
 * @param month - Month (0-11)
 * @returns Capitalized month name
 */
export const formatMonth = (month: number): string => {
  const date = new Date(2024, month, 1);
  const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};
