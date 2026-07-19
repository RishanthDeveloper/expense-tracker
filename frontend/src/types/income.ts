export interface Income {
  id: string;
  user_id: string;
  category_id?: string;
  category_name?: string;
  amount: number;
  description: string;
  transaction_date: string;
  created_at: string;
}

export interface CreateIncomeDTO {
  amount: number;
  description: string;
  category_name: string;
  transaction_date: string;
}
