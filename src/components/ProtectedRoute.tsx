import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMe } from '../api/authApi';
import { Typography, Box } from '@mui/material';

type ProtectedRouteProps = { children: React.ReactNode };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, user, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!token || !user) {
    // Redirect to home page but save the attempted location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;