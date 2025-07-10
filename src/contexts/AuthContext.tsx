import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any; data?: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setSession(null);
        setUser(null);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      setSession(null);
      setUser(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Error getting initial session:', error);
          setSession(null);
          setUser(null);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          // If user exists but no profile, create it
          if (session?.user && !error) {
            await ensureUserProfile(session.user);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (mounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      // Only set loading to false after we've processed the auth change
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        setLoading(false);
      }

      // Handle specific events
      if (event === 'SIGNED_IN' && session?.user) {
        await ensureUserProfile(session.user);
      }
      
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      }
    });

    // Handle visibility change to refresh session when tab becomes active
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !loading) {
        refreshSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const ensureUserProfile = async (user: User) => {
    try {
      // Check if user profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const userData = user.user_metadata;
        if (userData) {
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: user.id,
                full_name: userData.full_name || '',
                email: user.email || '',
                phone: userData.phone || '',
                gender: userData.gender || '',
                age: userData.age ? parseInt(userData.age) : null,
                created_at: new Date().toISOString(),
              },
            ]);

          if (insertError) {
            console.error('Error creating user profile:', insertError);
          }
        }
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.name,
            phone: userData.phone,
            gender: userData.gender,
            age: userData.age,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      return { error, data };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      // The auth state change listener will handle clearing the state
    } catch (error) {
      console.error('Error in signOut:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};