import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDTO } from '../types/expense';

export function useExpenses() {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => ExpenseService.getExpenses(),
  });

  const addExpenseMutation = useMutation({
    mutationFn: (dto: CreateExpenseDTO) => ExpenseService.addExpense(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: (id: string) => ExpenseService.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    expenses,
    isLoading,
    error,
    addExpense: addExpenseMutation.mutateAsync,
    deleteExpense: deleteExpenseMutation.mutateAsync,
  };
}
