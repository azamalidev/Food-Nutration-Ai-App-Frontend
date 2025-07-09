import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../authContext';

interface AuthFormProps {
  type: 'login' | 'register';
}

export function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (type === 'register') {
        const { apiService } = await import('../api/api');
        try {
          const response = await apiService.register({ email, password });
          console.log("Register response:", response);

          setSuccessMessage('Registration successful! You can now sign in.');
          setEmail('');
          setPassword('');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } catch (error: any) {
          const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
          setError(message);
          console.error('Register error:', message);
        }

      } else {
        // Handle Login - using the login function from useAuth
        try {
          const { success, error } = await login({ email, password });
          console.log("Login success:", success);

          if (success) {
            setSuccessMessage('Login successful! Redirecting...');
            setEmail('');
            setPassword('');
            setTimeout(() => {
              navigate('/dashboard');
            }, 500);
          } else {
            setError(error || 'Login failed. Please try again.');
          }
        } catch (error: any) {
          console.error(`${type} Error:`, error);
          setError(error.message || 'Something went wrong. Please try again.');
        }

      }
    } catch (error: any) {
      console.log(`${type} Error:`, error);

      if (type === 'register') {

        setError(
          error?.response?.data?.message || 'Registration failed. Please try again.'
        );

      } else {
        // Login error handling
        if (error?.response?.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (error?.response?.status === 404) {
          setError('Account not found. Please check your email or sign up.');
        } else {
          setError(
            error?.response?.data?.message || 'Login failed. Please try again.'
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {type === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {type === 'login'
            ? 'Sign in to access your personalized nutrition plan'
            : 'Start your journey to better health'}
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={type === 'login' ? 'current-password' : 'new-password'}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : type === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </div>

        {/* Toggle between login and register */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => navigate(type === 'login' ? '/register' : '/login')}
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </form>



    </div>
  );
}