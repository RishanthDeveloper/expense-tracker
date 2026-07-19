import { supabase } from '../supabase/client';
import { Category } from '../types/common';

export const CategoryService = {
  async getCategories(type?: 'income' | 'expense'): Promise<Category[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase.from('categories').select('*').eq('user_id', user.id);
    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Category[];
  },

  async addCategory(name: string, type: 'income' | 'expense'): Promise<Category> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('categories')
      .insert([{ user_id: user.id, name, type }])
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },
};
