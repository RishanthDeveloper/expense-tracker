import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AuthService, AuthUser } from '../services/auth.service';

export function useAuth() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getMe()
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch((err) => {
        console.warn('Authentication check failed:', err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const res = await AuthService.signUp({ email, password, fullName });
    if (res.user) {
      setUser(res.user);
      queryClient.invalidateQueries();
    }
    return res;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const res = await AuthService.signIn({ email, password });
    if (res.user) {
      setUser(res.user);
      queryClient.invalidateQueries();
    }
    return res;
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
    queryClient.clear();
  };

  return {
    user,
    session: user ? { user } : null,
    loading,
    isAuthenticated: !!user,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
}
