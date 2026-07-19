export interface Expense {
  id: string;
  user_id: string;
  category_id?: string;
  category_name?: string;
  amount: number;
  description: string;
  payment_method?: string;
  transaction_date: string;
  created_at: string;
}

export interface CreateExpenseDTO {
  amount: number;
  description: string;
  category_name: string;
  payment_method?: string;
  transaction_date: string;
}
