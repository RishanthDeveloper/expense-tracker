import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BudgetService } from '../services/budget.service';
import { CreateBudgetDTO } from '../types/budget';

export function useBudget() {
  const queryClient = useQueryClient();

  const { data: budgets = [], isLoading, error } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => BudgetService.getBudgets(),
  });

  const addBudgetMutation = useMutation({
    mutationFn: (dto: CreateBudgetDTO) => BudgetService.addBudget(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteBudgetMutation = useMutation({
    mutationFn: (id: string) => BudgetService.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    budgets,
    isLoading,
    error,
    addBudget: addBudgetMutation.mutateAsync,
    deleteBudget: deleteBudgetMutation.mutateAsync,
  };
}
