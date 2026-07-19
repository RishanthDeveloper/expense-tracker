import { supabase } from '../supabase/client';
import { Budget, CreateBudgetDTO } from '../types/budget';

export const BudgetService = {
  async getBudgets(): Promise<Budget[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('budgets')
      .select('*, categories(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch budgets error:', error.message);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      user_id: item.user_id,
      category_id: item.category_id,
      category_name: item.categories?.name || item.category_name || 'General Category',
      amount: Number(item.amount),
      month: Number(item.month),
      year: Number(item.year),
      created_at: item.created_at,
    }));
  },

  async addBudget(dto: CreateBudgetDTO): Promise<Budget> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('budgets')
      .insert([
        {
          user_id: user.id,
          amount: dto.amount,
          month: dto.month,
          year: dto.year,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      category_name: dto.category_name,
    } as Budget;
  },

  async deleteBudget(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  },
};
