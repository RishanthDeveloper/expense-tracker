import { apiClient } from '../api/client';
import { Budget, CreateBudgetDTO } from '../types/budget';

export const BudgetService = {
  async getBudgets(): Promise<Budget[]> {
    const data = await apiClient<any[]>('/budgets');
    return (data || []).map((item) => ({
      id: item.id,
      user_id: item.userId || '',
      category_id: item.categoryId || '',
      category_name: item.categoryName || 'General Category',
      amount: Number(item.budgetAmount || item.amount),
      spent: Number(item.spentAmount || 0),
      remaining: Number(item.remainingAmount || 0),
      percentage: Number(item.percentageUsed || 0),
      month: Number(item.month),
      year: Number(item.year),
      created_at: item.createdAt,
    }));
  },

  async addBudget(dto: CreateBudgetDTO): Promise<Budget> {
    const data = await apiClient<any>('/budgets', {
      method: 'POST',
      body: JSON.stringify({
        categoryId: dto.category_id || 'cat-general',
        amount: dto.amount,
        month: dto.month,
        year: dto.year,
      }),
    });

    return {
      id: data.id,
      user_id: data.userId || '',
      category_id: data.categoryId || '',
      category_name: data.categoryName || dto.category_name || 'General Category',
      amount: Number(data.budgetAmount || data.amount),
      spent: Number(data.spentAmount || 0),
      remaining: Number(data.remainingAmount || 0),
      percentage: Number(data.percentageUsed || 0),
      month: Number(data.month),
      year: Number(data.year),
      created_at: data.createdAt,
    };
  },

  async deleteBudget(id: string): Promise<void> {
    await apiClient(`/budgets/${id}`, { method: 'DELETE' });
  },
};
