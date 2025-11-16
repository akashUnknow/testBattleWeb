import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = "/log-in" }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simulate checking auth state
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check if user is trying to access auth pages while logged in
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
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