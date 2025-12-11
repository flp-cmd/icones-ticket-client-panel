import { State, LocalizationAvailable } from '@/types/localization';
import { PaginatedResponse } from '@/types/common';
import { httpService } from './httpService';

class LocalizationService {
  async getStates(): Promise<State[]> {
    const url = '/localizations/states';
    const response = await httpService.get<PaginatedResponse<State>>(url);
    return response.items;
  }

  async getAvailableLocalizations(query: string, type?: string): Promise<LocalizationAvailable[]> {
    const url = `/panel/admin/localizations/available?search=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`;
    const response = await httpService.get<PaginatedResponse<LocalizationAvailable>>(url);
    return response.items;
  }
}

export const localizationService = new LocalizationService();
