import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../stores/useAuthStore';

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore();

  // Login with Google
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  // Login
  const signUp = async (email: string, password: string) => {
    await supabase.auth.signUp({ email, password });
  };

  // Login
  const signIn = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  // Logout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Initialize auth state on app load
  const initializeAuth = async () => {
    // Check if there's an active session and set the user
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for auth state changes and update the user (setUser after login, setUser(null) after logout)
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signUp,
    signIn,
    signOut,
    initializeAuth
  };
}