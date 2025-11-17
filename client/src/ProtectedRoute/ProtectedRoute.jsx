import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = "/log-in" }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [oAuthAuthenticated, setOAuthAuthenticated] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkOAuthSession = async () => {
      // If already authenticated via Redux, no need to check
      if (isAuthenticated) {
        setIsChecking(false);
        return;
      }

      // Check if there's an OAuth session by trying to fetch user-info
      try {
        const response = await axios.get(`${API_URL}/user-info`, {
          withCredentials: true,
          timeout: 5000,
        });

        if (response.data && response.data.email) {
          // OAuth session exists
          setOAuthAuthenticated(true);
        }
      } catch (error) {
        console.log(error)
        // No OAuth session
        setOAuthAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    const timer = setTimeout(() => {
      checkOAuthSession();
    }, 300);

    return () => clearTimeout(timer);
  }, [isAuthenticated, API_URL]);

  // Show loading state while checking authentication
  if (isChecking || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-700 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Check if route requires authentication
  if (requireAuth && !isAuthenticated && !oAuthAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check if user is trying to access auth pages while logged in
  if (!requireAuth && (isAuthenticated || oAuthAuthenticated)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Wrapper for routes that should NOT be accessible when logged in
export const GuestRoute = ({ children }) => {
  return <ProtectedRoute requireAuth={false}>{children}</ProtectedRoute>;
};

// Wrapper for routes that require authentication
export const AuthRoute = ({ children, redirectTo }) => {
  return <ProtectedRoute requireAuth={true} redirectTo={redirectTo}>{children}</ProtectedRoute>;
};

export default ProtectedRoute;