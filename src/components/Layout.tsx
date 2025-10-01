import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoginModal from '../features/auth/LoginModal';
import { useState, useEffect } from 'react'; // Added useEffect import

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const Layout = () => {
  const { user, token, logout } = useAuthStore(); // Added token from useAuthStore
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Add route change monitoring for debugging
  useEffect(() => {
    console.log('Route changed - Current auth state:', {
      route: location.pathname,
      user: user ? user.username : 'No user',
      token: token ? 'Present' : 'Missing'
    });
  }, [location.pathname, user, token]);

  const handleLoginClick = () => setLoginModalOpen(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHomePage = location.pathname === '/';
  const isFavoritesPage = location.pathname === '/favorites';

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh' }}>
      {/* Add a subtle elevation for a modern feel */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Dog Viewer
            </Link>
          </Typography>

          {!isHomePage && (
            <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }} data-testid="breed-viewer-link">
              Breed Viewer
            </Button>
          )}
          
          {user && !isFavoritesPage && (
            <Button color="inherit" component={Link} to="/favorites" sx={{ mx: 1 }} data-testid="favorites-link">
              My Favourites
            </Button>
          )}
          
          {user ? (
            <>
              <Typography sx={{ mx: 2 }} data-testid="welcome-message">
                Welcome, {toTitleCase(user.username)}
              </Typography>
              <Button variant="outlined" color="primary" onClick={handleLogout} data-testid="logout-button">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleLoginClick} data-testid="login-button">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Use MUI Container for consistent spacing */}
      <Container component="main" sx={{ py: 4 }}>
        <Outlet />
      </Container>
      
      <LoginModal 
        open={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
      />
    </Box>
  );
};

export default Layout;