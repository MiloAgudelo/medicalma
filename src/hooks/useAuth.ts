import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useAuth] useEffect: Setting up onAuthStateChanged and getRedirectResult.');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[useAuth] onAuthStateChanged: User state changed:', user);
      setUser(user);
      setLoading(false);
      console.log('[useAuth] onAuthStateChanged: setLoading to false.');
      // setError(null); // Let's not nullify error here to see redirect errors
    });

    // Verificar si hay resultados de redirección al cargar
    console.log('[useAuth] useEffect: Calling getRedirectResult...');
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log('[useAuth] getRedirectResult success:', result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential?.accessToken;
          // The signed-in user info.
          // const user = result.user;
          setUser(result.user); // Ensure user is set here too
          setLoading(false); // And loading is false
          setError(null); // Clear any previous errors on successful redirect
        } else {
          console.log('[useAuth] getRedirectResult: No redirect result found (normal on initial load or if popup was used/closed).');
        }
      })
      .catch((err) => {
        console.error('[useAuth] getRedirectResult error:', err);
        setError((err as Error).message);
        setLoading(false); // Stop loading on redirect error
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
      // onAuthStateChanged will handle setting the user
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
      // onAuthStateChanged will handle setting the user
    } catch (err) {
      console.error('[useAuth] login error:', err);
      setError((err as Error).message);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    console.log('[useAuth] loginWithGoogle: Attempting Google sign-in with redirect.');
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      // After this, the app will redirect to Google, then back. 
      // getRedirectResult in useEffect will handle the result.
      console.log('[useAuth] loginWithGoogle: signInWithRedirect initiated.');
    } catch (err) {
      console.error('[useAuth] loginWithGoogle error during initiation:', err);
      setError((err as Error).message);
      setLoading(false); // Stop loading if signInWithRedirect fails immediately
      throw err;
    }
  };

  const logout = async () => {
    console.log('[useAuth] logout: Attempting to sign out.');
    try {
      setError(null);
      await signOut(auth);
      console.log('[useAuth] logout: Success.');
      setUser(null); // Explicitly set user to null
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
    loginWithGoogle,
    logout
  };
} 