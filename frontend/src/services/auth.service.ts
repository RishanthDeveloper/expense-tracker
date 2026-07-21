import { apiClient, TOKEN_KEY, REFRESH_TOKEN_KEY } from '../api/client';

export interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: AuthUser;
}

export const AuthService = {
  /**
   * Register a new user account via Spring Boot REST API
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const data = await apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.accessToken) {
      localStorage.setItem(TOKEN_KEY, data.accessToken);
    }
    if (data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }

    return data;
  },

  /**
   * Log in an existing user with Email & Password via Spring Boot REST API
   */
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const data = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.accessToken) {
      localStorage.setItem(TOKEN_KEY, data.accessToken);
    }
    if (data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }

    return data;
  },

  /**
   * Fetch current authenticated user profile
   */
  async getMe(): Promise<AuthUser | null> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const profile = await apiClient<any>('/users/profile');
      return {
        id: profile.id,
        email: profile.email,
        fullName: profile.fullName,
        avatarUrl: profile.avatarUrl,
      };
    } catch {
      return null;
    }
  },

  /**
   * Log out current session
   */
  async signOut(): Promise<void> {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },
};
