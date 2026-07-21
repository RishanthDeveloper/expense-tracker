import { apiClient } from '../api/client';
import { Income, CreateIncomeDTO } from '../types/income';

export const IncomeService = {
  async getIncomes(): Promise<Income[]> {
    const data = await apiClient<any[]>('/income');
    return (data || []).map((item) => ({
      id: item.id,
      user_id: item.userId || '',
      category_id: item.categoryId || '',
      category_name: item.categoryName || 'General Income',
      amount: Number(item.amount),
      description: item.description || '',
      transaction_date: item.transactionDate,
      created_at: item.createdAt,
    }));
  },

  async addIncome(dto: CreateIncomeDTO): Promise<Income> {
    const data = await apiClient<any>('/income', {
      method: 'POST',
      body: JSON.stringify({
        amount: dto.amount,
        description: dto.description,
        transactionDate: dto.transaction_date,
        categoryName: dto.category_name || 'General Income',
      }),
    });

    return {
      id: data.id,
      user_id: data.userId || '',
      category_id: data.categoryId || '',
      category_name: data.categoryName || dto.category_name || 'General Income',
      amount: Number(data.amount),
      description: data.description || '',
      transaction_date: data.transactionDate,
      created_at: data.createdAt,
    };
  },

  async deleteIncome(id: string): Promise<void> {
    await apiClient(`/income/${id}`, { method: 'DELETE' });
  },
};
