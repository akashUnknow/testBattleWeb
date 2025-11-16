import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useRequireAuth = (redirectTo = '/log-in') => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Please login to access this page');
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
};