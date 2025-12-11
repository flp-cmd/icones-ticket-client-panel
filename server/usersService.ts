import {
  UserAdministrator,
  UserAdministratorListParams,
  UserCustomer,
  UserCustomerListItem,
  UserCustomerListParams,
  UserClient,
  UserClientListParams,
  ClientUpdateData,
  ClientEventListResponse,
  ClientEventListParams,
  PanelUsersAccessLogsResponse,
  UserAccessLogsListParams,
} from '@/types/users';
import { PaymentMethod } from '@/types/orders';
import { PaginatedResponse } from '@/types/common';
import { httpService } from './httpService';
import { buildQueryParams } from '@/utils/apiUtils';

class UsersService {
  async getAdministrators(params: UserAdministratorListParams = {}): Promise<PaginatedResponse<UserAdministrator>> {
    const queryString = buildQueryParams(params);
    const url = `/panel/users/admins${queryString}`;

    return httpService.get<PaginatedResponse<UserAdministrator>>(url);
  }

  async getAdministratorDetails(userId: number): Promise<UserAdministrator> {
    const url = `/panel/users/admins/${userId}`;
    return httpService.get<UserAdministrator>(url);
  }

  async updateAdministrator(userId: number, data: { name: string; email: string }): Promise<void> {
    const url = `/panel/users/admins/${userId}/update`;
    return httpService.post<void>(url, data);
  }

  async updateAdministratorPassword(userId: number, password: string): Promise<void> {
    const url = `/panel/users/admins/${userId}/password`;
    return httpService.post<void>(url, { password });
  }

  async updateAdministratorPermissions(userId: number, permissions: string[]): Promise<void> {
    const url = `/panel/users/admins/${userId}/permissions`;
    return httpService.post<void>(url, { permissions });
  }

  async disableAdministratorTwoFactor(userId: number): Promise<void> {
    const url = `/panel/users/admins/${userId}/2fa/disable`;
    return httpService.post<void>(url);
  }

  async toggleAdministratorStatus(userId: number, active: boolean): Promise<void> {
    const url = `/panel/users/admins/${userId}/active`;
    return httpService.post<void>(url, { active });
  }

  async getCustomers(params: UserCustomerListParams = {}): Promise<PaginatedResponse<UserCustomerListItem>> {
    const queryString = buildQueryParams(params);
    const url = `/panel/users/customers${queryString}`;

    return httpService.get<PaginatedResponse<UserCustomerListItem>>(url);
  }

  async getCustomerDetails(userId: number): Promise<UserCustomer> {
    const url = `/panel/users/customers/${userId}`;
    return httpService.get<UserCustomer>(url);
  }

  async getCustomerAccessLogs(
    userId: number,
    params: UserAccessLogsListParams = {}
  ): Promise<PaginatedResponse<PanelUsersAccessLogsResponse>> {
    const queryString = buildQueryParams(params);
    const url = `/panel/users/customers/${userId}/access-logs${queryString}`;
    return httpService.get<PaginatedResponse<PanelUsersAccessLogsResponse>>(url);
  }

  async updateCustomer(userId: number, data: { firstName: string; lastName: string; phone: string }): Promise<void> {
    const url = `/panel/users/customers/${userId}/update`;
    return httpService.post<void>(url, data);
  }

  async updateCustomerEmail(userId: number, email: string): Promise<void> {
    const url = `/panel/users/customers/${userId}/email`;
    return httpService.post<void>(url, { email });
  }

  async updateCustomerDocument(userId: number, documentNumber: string): Promise<void> {
    const url = `/panel/users/customers/${userId}/document-number`;
    return httpService.post<void>(url, { documentNumber });
  }

  async updateCustomerPassword(userId: number, password: string): Promise<void> {
    const url = `/panel/users/customers/${userId}/password`;
    return httpService.post<void>(url, { password });
  }

  async deleteCustomer(userId: number): Promise<void> {
    const url = `/panel/users/customers/${userId}`;
    return httpService.delete<void>(url);
  }

  async toggleCustomerStatus(userId: number, active: boolean): Promise<void> {
    const url = `/panel/users/customers/${userId}/active`;
    return httpService.post<void>(url, { active });
  }

  async validateCustomerEmail(userId: number): Promise<void> {
    const url = `/panel/users/customers/${userId}/email/active`;
    return httpService.post<void>(url, {});
  }

  async generateCustomerToken(userId: number): Promise<{ accessToken: string }> {
    const url = `/panel/users/customers/${userId}/token`;
    return httpService.post<{ accessToken: string }>(url);
  }

  async updateCustomerPaymentOptions(userId: number, blockedPaymentTypes: PaymentMethod[]): Promise<void> {
    const url = `/panel/users/customers/${userId}/payment-options`;
    return httpService.post<void>(url, { blockedPaymentTypes });
  }

  async getClients(params: UserClientListParams = {}): Promise<PaginatedResponse<UserClient>> {
    const queryString = buildQueryParams(params);
    const url = `/panel/users/clients${queryString}`;

    return httpService.get<PaginatedResponse<UserClient>>(url);
  }

  async getClientDetails(userId: number): Promise<UserClient> {
    const url = `/panel/users/clients/${userId}`;
    return httpService.get<UserClient>(url);
  }

  async updateClient(userId: number, data: ClientUpdateData): Promise<void> {
    const url = `/panel/users/clients/${userId}/update`;
    return httpService.post<void>(url, data);
  }

  async updateClientPassword(userId: number, password: string): Promise<void> {
    const url = `/panel/users/clients/${userId}/password`;
    return httpService.post<void>(url, { password });
  }

  async updateClientEvents(userId: number, eventIds: number[]): Promise<void> {
    const url = `/panel/users/clients/${userId}/events`;
    return httpService.post<void>(url, { eventIds });
  }

  async disableClientTwoFactor(userId: number): Promise<void> {
    const url = `/panel/users/clients/${userId}/2fa/disable`;
    return httpService.post<void>(url);
  }

  async getClientEvents(params: ClientEventListParams = {}): Promise<ClientEventListResponse> {
    const queryString = buildQueryParams(params);
    const url = `/panel/users/clients/events${queryString}`;
    return httpService.get<ClientEventListResponse>(url);
  }

  async toggleClientStatus(userId: number, active: boolean): Promise<void> {
    const url = `/panel/users/clients/${userId}/active`;
    return httpService.post<void>(url, { active });
  }
}

export const usersService = new UsersService();
