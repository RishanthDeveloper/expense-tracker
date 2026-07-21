import { apiClient } from '../api/client';
import { Expense, CreateExpenseDTO } from '../types/expense';

export const ExpenseService = {
  async getExpenses(): Promise<Expense[]> {
    const data = await apiClient<any[]>('/expenses');
    return (data || []).map((item) => ({
      id: item.id,
      user_id: item.userId || '',
      category_id: item.categoryId || '',
      category_name: item.categoryName || 'General Expense',
      amount: Number(item.amount),
      description: item.description || '',
      payment_method: item.paymentMethod || 'Card',
      transaction_date: item.transactionDate,
      created_at: item.createdAt,
    }));
  },

  async addExpense(dto: CreateExpenseDTO): Promise<Expense> {
    const data = await apiClient<any>('/expenses', {
      method: 'POST',
      body: JSON.stringify({
        amount: dto.amount,
        description: dto.description,
        paymentMethod: dto.payment_method || 'Card',
        transactionDate: dto.transaction_date,
        categoryName: dto.category_name || 'General Expense',
      }),
    });

    return {
      id: data.id,
      user_id: data.userId || '',
      category_id: data.categoryId || '',
      category_name: data.categoryName || dto.category_name || 'General Expense',
      amount: Number(data.amount),
      description: data.description || '',
      payment_method: data.paymentMethod || dto.payment_method || 'Card',
      transaction_date: data.transactionDate,
      created_at: data.createdAt,
    };
  },

  async deleteExpense(id: string): Promise<void> {
    await apiClient(`/expenses/${id}`, { method: 'DELETE' });
  },
};
