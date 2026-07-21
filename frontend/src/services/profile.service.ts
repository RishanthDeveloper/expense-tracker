import { apiClient } from '../api/client';
import { Profile, UpdateProfileDTO } from '../types/profile';

export const ProfileService = {
  async getProfile(): Promise<Profile | null> {
    try {
      const data = await apiClient<any>('/users/profile');
      return {
        id: data.id,
        full_name: data.fullName || 'User',
        phone: data.phone || '',
        currency: data.currency || 'INR',
        timezone: data.timezone || 'Asia/Kolkata',
        avatar_url: data.avatarUrl || '',
      };
    } catch {
      return null;
    }
  },

  async updateProfile(dto: UpdateProfileDTO): Promise<Profile> {
    const data = await apiClient<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({
        fullName: dto.full_name,
        phone: dto.phone,
        currency: dto.currency,
        timezone: dto.timezone,
        avatarUrl: dto.avatar_url,
      }),
    });

    return {
      id: data.id,
      full_name: data.fullName,
      phone: data.phone,
      currency: data.currency,
      timezone: data.timezone,
      avatar_url: data.avatarUrl,
    };
  },

  async updatePassword(newPassword: string): Promise<void> {
    await apiClient('/users/password', {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    });
  },

  async uploadAvatar(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Url = reader.result as string;
        await this.updateProfile({ avatar_url: base64Url });
        resolve(base64Url);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
