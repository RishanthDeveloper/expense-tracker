export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
  created_at: string;
}
