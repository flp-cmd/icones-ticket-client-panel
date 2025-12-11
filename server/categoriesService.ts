import { httpService } from './httpService';
import { PaginatedResponse } from '@/types/common';
import { CategoryAvailable } from '@/types/categories';

class CategoriesService {
  async getAvailableCategories(): Promise<CategoryAvailable[]> {
    const url = '/panel/admin/categories/available';
    const response = await httpService.get<PaginatedResponse<CategoryAvailable>>(url);
    return response.items;
  }
}

export const categoriesService = new CategoriesService();
