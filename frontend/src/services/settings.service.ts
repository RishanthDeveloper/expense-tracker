import { supabase } from '../supabase/client';
import { UserSettings, UpdateSettingsDTO } from '../types/settings';

export const SettingsService = {
  async getSettings(): Promise<UserSettings | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.warn('Supabase fetch settings warning:', error.message);
      return {
        user_id: user.id,
        theme: 'dark',
        language: 'en',
        currency: 'USD',
        email_notifications: true,
        push_notifications: true,
        budget_alerts: true,
        ai_enabled: true,
      };
    }

    return data as UserSettings;
  },

  async updateSettings(dto: UpdateSettingsDTO): Promise<UserSettings> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('settings')
      .update(dto)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data as UserSettings;
  },
};
