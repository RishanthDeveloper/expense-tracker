export interface UserSettings {
  user_id: string;
  theme: 'light' | 'dark';
  language?: string;
  currency?: string;
  email_notifications: boolean;
  push_notifications: boolean;
  budget_alerts: boolean;
  ai_enabled: boolean;
  updated_at?: string;
}

export interface UpdateSettingsDTO {
  theme?: 'light' | 'dark';
  language?: string;
  currency?: string;
  email_notifications?: boolean;
  push_notifications?: boolean;
  budget_alerts?: boolean;
  ai_enabled?: boolean;
}
