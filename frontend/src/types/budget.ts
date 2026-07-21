export interface Budget {
  id: string;
  user_id: string;
  category_id?: string;
  category_name: string;
  amount: number;
  spent?: number;
  remaining?: number;
  percentage?: number;
  month: number;
  year: number;
  created_at?: string;
}

export interface CreateBudgetDTO {
  category_id?: string;
  category_name: string;
  amount: number;
  month: number;
  year: number;
}
