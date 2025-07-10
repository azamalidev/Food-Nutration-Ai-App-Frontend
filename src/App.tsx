import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HealthProfile from './pages/HealthProfile';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { useAuth } from './hooks/useAuth';
import Users from './AdminPanel/pages/Users';
import Products from './AdminPanel/pages/Products';
import Reports from './AdminPanel/pages/Reports';
import Settings from './AdminPanel/pages/Settings';
import Dash from './AdminPanel/pages/Dashboard';

// PrivateRoute protects routes from unauthenticated users
function PrivateRoute({ children }: { children: React.ReactNode }) {



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


          <Route path="admindashboard" element={<Dash />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
