import { useState, useEffect, useCallback } from 'react';
import {
  apiService,
  LoginData,
  UserProfile,
} from '../api/api';

interface AuthState {
  user: UserProfile | null;
  token: string;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: '',
    isLoading: true,
    isAuthenticated: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Function to check and set auth state
  // const checkAuthState = useCallback(async () => {
  //   try {
  //     if (apiService.isAuthenticated()) {
  //       const response = await apiService.getUserProfile();
  //       // Check if response has the expected structure based on your API
  //       if (response) {
  //         setAuthState({
  //           user: response.data.data || response.data, // Handle both possible structures
  //           token: response.data.token || localStorage.getItem('authToken') || '',
  //           isLoading: false,
  //           isAuthenticated: true,
  //         });
  //         return true;
  //       } else {
  //         console.warn('Failed to get user profile, clearing auth state');
  //         // apiService.logout();
  //         setAuthState({
  //           user: null,
  //           token: '',
  //           isLoading: false,
  //           isAuthenticated: false,
  //         });
  //         return false;
  //       }
  //     } else {
  //       setAuthState({
  //         user: null,
  //         token: '',
  //         isLoading: false,
  //         isAuthenticated: false,
  //       });
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error('Auth check error:', err);
  //     // If we get a 403, it means the token is invalid/expired
  //     // if (err instanceof Error && err.message.includes('403')) {
  //     //   console.warn('Token appears to be invalid, logging out');
  //     //   apiService.logout();
  //     // }
  //     setError(err instanceof Error ? err.message : 'Authentication error');
  //     setAuthState({
  //       user: null,
  //       token: '',
  //       isLoading: false,
  //       isAuthenticated: false,
  //     });
  //     return false;
  //   }
  // }, []);

  // Initialize auth state
  // useEffect(() => {
  //   checkAuthState();
  // }, [checkAuthState]);

  // Login function - FIXED
  const login = async (credentials: LoginData): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await apiService.login(credentials);

      if (response && response.data && response.data.token) {
        setAuthState({
          user: response.data.data,
          token: response.data.token,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      } else {
        const errorMessage = response?.meta?.message || 'Unexpected login response';
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login error';
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: errorMessage };
    }
  };



  // Logout function
  const logout = () => {
    apiService.logout();
    setAuthState({
      user: null,
      token: '',
      isLoading: false,
      isAuthenticated: false,
    });
    setError(null);
  };

  return {
    ...authState,
    error,
    login,
    logout,
    // checkAuthState,
    clearError: () => setError(null),
  };
};