import { supabase } from '../supabase/client';
import { Expense, CreateExpenseDTO } from '../types/expense';

export const ExpenseService = {
  async getExpenses(): Promise<Expense[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('expenses')
      .select('*, categories(name)')
      .eq('user_id', user.id)
      .order('transaction_date', { ascending: false });

    if (error) {
      console.warn('Supabase fetch expenses error:', error.message);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      user_id: item.user_id,
      category_id: item.category_id,
      category_name: item.categories?.name || 'General Expense',
      amount: Number(item.amount),
      description: item.description || '',
      payment_method: item.payment_method || 'Card',
      transaction_date: item.transaction_date,
      created_at: item.created_at,
    }));
  },

  async addExpense(dto: CreateExpenseDTO): Promise<Expense> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          user_id: user.id,
          amount: dto.amount,
          description: dto.description,
          transaction_date: dto.transaction_date,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      category_name: dto.category_name,
      payment_method: dto.payment_method || 'Card',
    } as Expense;
  },

  async deleteExpense(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  },
};
