import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SettingsService } from '../services/settings.service';
import { UpdateSettingsDTO } from '../types/settings';

export function useSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: () => SettingsService.getSettings(),
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (dto: UpdateSettingsDTO) => SettingsService.updateSettings(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings: updateSettingsMutation.mutateAsync,
  };
}
