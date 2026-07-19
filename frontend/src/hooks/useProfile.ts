import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDTO } from '../types/profile';

export function useProfile() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => ProfileService.getProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (dto: UpdateProfileDTO) => ProfileService.updateProfile(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => ProfileService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (newPassword: string) => ProfileService.updatePassword(newPassword),
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutateAsync,
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    updatePassword: updatePasswordMutation.mutateAsync,
  };
}
