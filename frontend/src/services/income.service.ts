import { supabase } from '../supabase/client';
import { Income, CreateIncomeDTO } from '../types/income';

export const IncomeService = {
  async getIncomes(): Promise<Income[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('income')
      .select('*, categories(name)')
      .eq('user_id', user.id)
      .order('transaction_date', { ascending: false });

    if (error) {
      console.warn('Supabase fetch income error:', error.message);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      user_id: item.user_id,
      category_id: item.category_id,
      category_name: item.categories?.name || 'General Income',
      amount: Number(item.amount),
      description: item.description || '',
      transaction_date: item.transaction_date,
      created_at: item.created_at,
    }));
  },

  async addIncome(dto: CreateIncomeDTO): Promise<Income> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('income')
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
    } as Income;
  },

  async deleteIncome(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('income')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  },
};
