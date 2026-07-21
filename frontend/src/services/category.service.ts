import { apiClient } from '../api/client';
import { Category } from '../types/common';

export const CategoryService = {
  async getCategories(type?: 'income' | 'expense'): Promise<Category[]> {
    const data = await apiClient<Category[]>('/categories');
    if (type) {
      return (data || []).filter((c) => c.type === type);
    }
    return data || [];
  },

  async addCategory(name: string, type: 'income' | 'expense'): Promise<Category> {
    return apiClient<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify({ name, type }),
    });
  },
};
