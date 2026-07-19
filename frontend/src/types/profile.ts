export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  currency?: string;
  timezone?: string;
  created_at?: string;
}

export interface UpdateProfileDTO {
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  currency?: string;
  timezone?: string;
}
