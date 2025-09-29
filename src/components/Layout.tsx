import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoginModal from '../features/auth/LoginModal';
import { useState } from 'react';

// Add the toTitleCase function here
function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const Layout = () => {
  const { user, logout } = useAuthStore();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '';
  // Check if we're on the favorites page
  const isFavoritesPage = location.pathname === '/favorites';

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Dog Breed Viewer
            </Link>
          </Typography>
          
          {/* Navigation Links */}
          {/* Breed Viewer Link - Only show when NOT on home page */}
          {!isHomePage && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              sx={{ mx: 1 }}
              data-testid="breed-viewer-link"
            >
              Breed Viewer
            </Button>
          )}
          
          {/* Favorites Link - Only show when logged in AND NOT on favorites page */}
          {user && !isFavoritesPage && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/favorites" 
              sx={{ mx: 1 }}
              data-testid="favorites-link"
            >
              Favorites
            </Button>
          )}
          
          {/* Auth Section */}
          {user ? (
            <>
              <Typography sx={{ mx: 2 }} data-testid="welcome-message">
                {/* Apply toTitleCase to the username here */}
                Welcome, {toTitleCase(user.username)}
              </Typography>
              <Button color="inherit" onClick={handleLogout} data-testid="logout-button">
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginClick} data-testid="login-button">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      
      {/* Login Modal */}
      <LoginModal 
        open={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default Layout;