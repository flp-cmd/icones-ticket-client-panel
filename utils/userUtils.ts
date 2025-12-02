/**
 * Check if a user is deleted based on their email
 * @param email - The user's email address
 * @returns true if the email contains '-excluido', false otherwise
 */
export function isUserDeleted(email: string): boolean {
  return email.toLowerCase().includes('-excluido');
}

/**
 * Mask sensitive data for deleted users
 * @param value - The value to mask
 * @returns Masked value or original value if not deleted
 */
export function maskDeletedUserData(value: string, isDeleted: boolean): string {
  if (!isDeleted) return value;

  // Mask the entire value with asterisks
  return '*'.repeat(value.length);
}

/**
 * Get display name for a user, masking last name if deleted
 * @param fullName - The full name of the user
 * @param email - The user's email to check if deleted
 * @returns Display name with last name masked if user is deleted
 */
export function getDisplayName(fullName: string, email: string): string {
  const isDeleted = isUserDeleted(email);

  if (!isDeleted) return fullName;

  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  return `${firstName} ${maskDeletedUserData(lastName, true)}`;
}

/**
 * Get masked customer data for display
 * @param customer - Customer object with email and other data
 * @returns Object with masked customer data
 */
export function getMaskedCustomerData(customer: {
  name: string;
  email: string;
  documentNumber?: string;
  phone?: string;
}) {
  const isDeleted = isUserDeleted(customer.email);

  return {
    displayName: getDisplayName(customer.name, customer.email),
    maskedEmail: maskDeletedUserData(customer.email, isDeleted),
    maskedDocumentNumber: customer.documentNumber ? maskDeletedUserData(customer.documentNumber, isDeleted) : undefined,
    maskedPhone: customer.phone ? maskDeletedUserData(customer.phone, isDeleted) : undefined,
    isDeleted,
  };
}

/**
 * Get formatted and masked customer data for display (for orders context)
 * @param customer - Customer object with email and other data
 * @returns Object with formatted and masked customer data
 */
export function getMaskedOrderCustomerData(customer: {
  name: string;
  email: string;
  documentNumber?: string;
  phone?: string;
}) {
  const isDeleted = isUserDeleted(customer.email);

  return {
    displayName: getDisplayName(customer.name, customer.email),
    maskedEmail: maskDeletedUserData(customer.email, isDeleted),
    maskedDocumentNumber: customer.documentNumber
      ? isDeleted
        ? maskDeletedUserData(formatCPF(customer.documentNumber), true)
        : formatCPF(customer.documentNumber)
      : undefined,
    maskedPhone: customer.phone
      ? isDeleted
        ? maskDeletedUserData(formatPhone(customer.phone), true)
        : formatPhone(customer.phone)
      : undefined,
    isDeleted,
  };
}

import { formatCPF, formatPhone } from './maskUtils';
import { formatGender } from './genderUtils';
import { formatDate } from './dateUtils';
import { Gender } from '@/types/users';

/**
 * Get formatted and masked customer details for display (for customer details context)
 * @param customer - Customer object with all customer data
 * @param cityName - City name
 * @param stateName - State name
 * @returns Object with all formatted and masked customer data
 */
export function getMaskedCustomerDetailsData(
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    documentNumber: string;
    phone: string;
    gender: Gender;
    birthDate: string;
    whatsApp?: string | null;
  },
  cityName?: string,
  stateName?: string
) {
  const isDeleted = isUserDeleted(customer.email);
  const fullName = `${customer.firstName} ${customer.lastName}`;

  return {
    displayName: getDisplayName(fullName, customer.email),
    maskedEmail: maskDeletedUserData(customer.email, isDeleted),
    maskedDocumentNumber: maskDeletedUserData(formatCPF(customer.documentNumber), isDeleted),
    maskedPhone: maskDeletedUserData(formatPhone(customer.phone), isDeleted),
    maskedGender: maskDeletedUserData(formatGender(customer.gender), isDeleted),
    maskedBirthDate:
      customer.birthDate && !isNaN(new Date(customer.birthDate).getTime())
        ? maskDeletedUserData(
            formatDate(new Date(customer.birthDate.split('T')[0] + 'T00:00:00'), {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            isDeleted
          )
        : 'Não informado',
    maskedCity: cityName && stateName ? maskDeletedUserData(`${cityName}, ${stateName}`, isDeleted) : 'Não informado',
    maskedWhatsApp: customer.whatsApp ? maskDeletedUserData(formatPhone(customer.whatsApp), isDeleted) : undefined,
    isDeleted,
  };
}
