import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IncomeService } from '../services/income.service';
import { CreateIncomeDTO } from '../types/income';

export function useIncome() {
  const queryClient = useQueryClient();

  const { data: incomeList = [], isLoading, error } = useQuery({
    queryKey: ['income'],
    queryFn: () => IncomeService.getIncomes(),
  });

  const addIncomeMutation = useMutation({
    mutationFn: (dto: CreateIncomeDTO) => IncomeService.addIncome(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: (id: string) => IncomeService.deleteIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    incomeList,
    isLoading,
    error,
    addIncome: addIncomeMutation.mutateAsync,
    deleteIncome: deleteIncomeMutation.mutateAsync,
  };
}
