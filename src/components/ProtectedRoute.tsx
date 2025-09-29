import { useEffect, useState, useRef } from 'react'; // Add useRef
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMe } from '../api/authApi';
import { Typography, Box } from '@mui/material';
import toast from 'react-hot-toast';

type ProtectedRouteProps = { children: React.ReactNode };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, user, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const toastShownRef = useRef(false); // Track if toast has been shown

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const userData = await getMe(token);
          login(token, userData);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    
    verifyToken();
  }, [token, login, logout]);

  // Move toast to useEffect to control when it's shown
  useEffect(() => {
    if (!loading && (!token || !user) && !toastShownRef.current) {
      toast.error('Please log in to access this page');
      toastShownRef.current = true; // Mark toast as shown
    }
  }, [loading, token, user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!token || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;