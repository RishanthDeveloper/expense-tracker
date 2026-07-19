import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase/client';
import { AuthService } from '../services/auth.service';
import { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch initial session from AuthService
    AuthService.getSession()
      .then((activeSession) => {
        setSession(activeSession);
        setUser(activeSession?.user ?? null);
      })
      .catch((err) => {
        console.warn('Supabase Auth getSession warning:', err);
      })
      .finally(() => {
        setLoading(false);
      });

    // 2. Subscribe to auth state changes (LOGIN, LOGOUT, TOKEN_REFRESHED)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession) {
        setSession(currentSession);
        setUser(currentSession.user);
        setLoading(false);
        queryClient.invalidateQueries();
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const res = await AuthService.signUp({ email, password, fullName });
    if (res.user) {
      setUser(res.user as any);
      setSession(res.session as any);
    }
    return res;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const res = await AuthService.signIn({ email, password });
    if (res.user) {
      setUser(res.user as any);
      setSession(res.session as any);
    }
    return res;
  };

  const signInWithGoogle = async () => {
    const res: any = await AuthService.signInWithGoogle();
    if (res?.user) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
    setSession(null);
    queryClient.clear();
  };

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };
}
