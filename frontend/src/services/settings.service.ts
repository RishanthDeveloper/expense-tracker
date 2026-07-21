import { apiClient } from '../api/client';
import { UserSettings, UpdateSettingsDTO } from '../types/settings';

export const SettingsService = {
  async getSettings(): Promise<UserSettings | null> {
    try {
      const data = await apiClient<any>('/users/settings');
      return {
        user_id: data.userId || '',
        theme: data.theme || 'dark',
        language: data.language || 'en',
        currency: data.currency || 'INR',
        email_notifications: data.emailNotifications ?? true,
        push_notifications: data.pushNotifications ?? true,
        budget_alerts: data.budgetAlerts ?? true,
        ai_enabled: data.aiEnabled ?? true,
      };
    } catch {
      return null;
    }
  },

  async updateSettings(dto: UpdateSettingsDTO): Promise<UserSettings> {
    const data = await apiClient<any>('/users/settings', {
      method: 'PUT',
      body: JSON.stringify({
        theme: dto.theme,
        language: dto.language,
        currency: dto.currency,
        emailNotifications: dto.email_notifications,
        pushNotifications: dto.push_notifications,
        budgetAlerts: dto.budget_alerts,
        aiEnabled: dto.ai_enabled,
      }),
    });

    return {
      user_id: data.userId || '',
      theme: data.theme || 'dark',
      language: data.language || 'en',
      currency: data.currency || 'INR',
      email_notifications: data.emailNotifications ?? true,
      push_notifications: data.pushNotifications ?? true,
      budget_alerts: data.budgetAlerts ?? true,
      ai_enabled: data.aiEnabled ?? true,
    };
  },
};
