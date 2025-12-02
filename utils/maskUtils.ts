/**
 * Utility functions for input masks
 */

/**
 * Formats a CPF string with mask (000.000.000-00)
 */
export function formatCPF(value: string): string {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Apply CPF mask
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14); // Limit to 14 characters (000.000.000-00)
}

/**
 * Removes mask from CPF string
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates if a CPF string is complete (11 digits)
 */
export function isCPFComplete(value: string): boolean {
  const numbers = unformatCPF(value);
  return numbers.length === 11;
}

/**
 * Formats a phone number with mask
 * Supports: (11) 99999-9999 or (11) 9999-9999
 */
export function formatPhone(value: string): string {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Apply phone mask based on length
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
}

/**
 * Removes mask from phone string
 */
export function unformatPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates if a phone string is complete (10 or 11 digits)
 */
export function isPhoneComplete(value: string): boolean {
  const numbers = unformatPhone(value);
  return numbers.length === 10 || numbers.length === 11;
}

/**
 * Formats a CNPJ string with mask (00.000.000/0000-00)
 */
export function formatCNPJ(value: string): string {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');

  // Apply CNPJ mask
  return numbers
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    .slice(0, 18); // Limit to 18 characters (00.000.000/0000-00)
}

/**
 * Removes mask from CNPJ string
 */
export function unformatCNPJ(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates if a CNPJ string is complete (14 digits)
 */
export function isCNPJComplete(value: string): boolean {
  const numbers = unformatCNPJ(value);
  return numbers.length === 14;
}
