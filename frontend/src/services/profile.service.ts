import { supabase } from '../supabase/client';
import { Profile, UpdateProfileDTO } from '../types/profile';

export const ProfileService = {
  async getProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.warn('Supabase fetch profile error:', error.message);
      return {
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        currency: 'USD ($)',
        timezone: 'America/New_York (UTC-5)',
      };
    }

    return data as Profile;
  },

  async updateProfile(dto: UpdateProfileDTO): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .update(dto)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async uploadAvatar(file: File): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    await this.updateProfile({ avatar_url: publicUrl });
    return publicUrl;
  },

  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },
};
