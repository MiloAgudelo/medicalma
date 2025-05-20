import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useAuth] useEffect: Setting up onAuthStateChanged.');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[useAuth] onAuthStateChanged: User state changed:', user);
      setUser(user);
      setLoading(false);
      console.log('[useAuth] onAuthStateChanged: setLoading to false.');
    });

    return () => {
      console.log('[useAuth] useEffect cleanup: Unsubscribing from onAuthStateChanged.');
      unsubscribe();
    }
  }, []);

  const signup = async (email: string, password: string) => {
    console.log('[useAuth] signup: Attempting to sign up with email:', email);
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('[useAuth] signup: Success for email:', email);
    } catch (err) {
      console.error('[useAuth] signup error:', err);
      setError((err as Error).message);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    console.log('[useAuth] login: Attempting to log in with email:', email);
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('[useAuth] login: Success for email:', email);
    } catch (err) {
      console.error('[useAuth] login error:', err);
      setError((err as Error).message);
      throw err;
    }
  };

  const logout = async () => {
    console.log('[useAuth] logout: Attempting to sign out.');
    try {
      setError(null);
      await signOut(auth);
      console.log('[useAuth] logout: Success.');
      setUser(null);
    } catch (err) {
      console.error('[useAuth] logout error:', err);
      setError((err as Error).message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    setError,
    signup,
    login,
    logout
  };
} 