import { ActiveStatus } from './common';
import { TableFilters } from '@/contexts/TableContext';
import { PaymentMethod } from './orders';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum CredentialType {
  PASSWORD = 'password',
  GOOGLE = 'google',
}

export interface UserAdministrator extends ActiveStatus {
  userId: number;
  email: string;
  name: string;
  isMaster: boolean;
  twoFactorEnabled: boolean;
  roles?: string[]; // Received from API as roles (represent current permissions)
}

export interface UserAdministratorFilters extends TableFilters {
  email?: string;
  name?: string;
  active?: string;
}

export interface UserAdministratorListParams {
  page?: number;
  perPage?: number;
  email?: string;
  name?: string;
  active?: string;
}

export interface AdministratorUpdateData {
  name: string;
  email: string;
}

export interface AdministratorPasswordUpdateData {
  password: string;
}

export interface AdministratorPermissionsUpdateData {
  permissions: string[];
}

export interface UserCustomerListItem extends ActiveStatus {
  userId: number;
  email: string;
  documentNumber: string;
  name: string;
  phone: string;
  twoFactorEnabled: boolean;
  emailValidated: boolean;
  createdAt: string;
}

export interface UserCustomer extends ActiveStatus {
  userId: number;
  email: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: Gender;
  birthDate: string;
  blockedPaymentTypes: PaymentMethod[];
  cityId: number;
  stateId: number;
  whatsApp?: string | null;
  twoFactorEnabled: boolean;
  emailValidated: boolean;
  createdAt: string;
  credentials: CredentialType[];
}

export interface UserCustomerFilters extends TableFilters {
  userId?: string;
  email?: string;
  name?: string;
  documentNumber?: string;
  phone?: string;
  active?: string;
}

export interface UserCustomerListParams {
  page?: number;
  perPage?: number;
  email?: string;
  name?: string;
  documentNumber?: string;
  phone?: string;
  active?: string;
}

export interface UserClient extends ActiveStatus {
  userId: number;
  email: string;
  documentNumber: string;
  name: string;
  twoFactorEnabled: boolean;
  events?: ClientEvent[];
  eventsTotal?: number;
}

export interface UserClientFilters extends TableFilters {
  userId?: string;
  email?: string;
  name?: string;
  documentNumber?: string;
  active?: string;
}

export interface UserClientListParams {
  page?: number;
  perPage?: number;
  email?: string;
  name?: string;
  documentNumber?: string;
  active?: string;
}

export interface ClientUpdateData {
  name: string;
  email: string;
  documentNumber: string;
}

export interface ClientEvent {
  eventId: number;
  name: string;
  startsAt: string;
  localization: string;
  city: string;
}

export interface ClientEventListResponse {
  items: ClientEvent[];
  total: number;
  page: number;
  perPage: number;
}

export interface ClientEventListParams {
  page?: number;
  perPage?: number;
  name?: string;
}

export interface PanelUsersAccessLogsResponse {
  accessLogId: number;
  userId: number;
  accessType: string;
  credentialType: string;
  ipAddress: string;
  userAgent?: string;
  createdAt: Date;
  userType?: string;
  userEmail?: string;
}

export interface UserAccessLogsFilters extends TableFilters {
  accessType?: string;
  credentialType?: string;
  ipAddress?: string;
}

export interface UserAccessLogsListParams {
  page?: number;
  perPage?: number;
  accessType?: string;
  credentialType?: string;
  ipAddress?: string;
}
