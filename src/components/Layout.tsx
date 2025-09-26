import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoginModal from '../features/auth/LoginModal';
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

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
          <Button 
            color="inherit" 
            component={Link} 
            to="/" 
            sx={{ mx: 1 }}
            data-testid="breed-viewer-link"
          >
            Breed Viewer
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/favorites" 
            sx={{ mx: 1 }}
            data-testid="favorites-link"
          >
            Favorites
          </Button>
          
          {/* Auth Section */}
          {user ? (
            <>
              <Typography sx={{ mx: 2 }} data-testid="welcome-message">
                Welcome, {user.username}
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