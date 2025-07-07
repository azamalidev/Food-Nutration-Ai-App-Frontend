import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HealthProfile from './pages/HealthProfile';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { useAuth } from './hooks/useAuth';

// PrivateRoute protects routes from unauthenticated users
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();



  if (!localStorage.getItem('authToken')) {
    console.log("hehhehahah")
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <HealthProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
