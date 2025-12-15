import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  token?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error?: string | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (firstName: string | undefined, lastName: string | undefined, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toAppUser = (suUser: any, accessToken?: string | null): User => ({
  id: suUser?.id,
  email: suUser?.email || '',
  firstName: suUser?.user_metadata?.first_name || suUser?.user_metadata?.firstName || null,
  lastName: suUser?.user_metadata?.last_name || suUser?.user_metadata?.lastName || null,
  token: accessToken || null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // read current session/user from Supabase
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session || null;
        const suUser = session?.user || null;
        if (suUser && mounted) {
          setUser(toAppUser(suUser, session?.access_token ?? null));
        }
      } catch (err) {
        console.warn('Error getting supabase session', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // listen to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(toAppUser(session.user, session.access_token ?? null));
      } else if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      throw new Error(error.message);
    }

    const session = data?.session ?? null;
    const suUser = data?.user ?? session?.user ?? null;
    if (!suUser) {
      throw new Error('No user returned from Supabase');
    }
    const appUser = toAppUser(suUser, session?.access_token ?? null);
    setUser(appUser);
    return appUser;
  };

  const signup = async (firstName: string | undefined, lastName: string | undefined, email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName ?? null, last_name: lastName ?? null } } });
    setLoading(false);
    if (error) {
      setError(error.message);
      throw new Error(error.message);
    }

    // signUp may or may not return a session depending on email confirmation settings
    const session = data?.session ?? null;
    const suUser = data?.user ?? session?.user ?? null;
    if (!suUser) {
      // user might need to confirm their email; return a minimal object
      throw new Error('Sign up successful — please confirm your email if required.');
    }
    const appUser = toAppUser(suUser, session?.access_token ?? null);
    setUser(appUser);
    return appUser;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default useAuth;
