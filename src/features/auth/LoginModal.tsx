import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from '@mui/material';
import { login } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

type LoginModalProps = { open: boolean; onClose: () => void };

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login: setLogin } = useAuthStore();

  const handleLogin = async () => {
    try {
      const data = await login({ username, password, expiresInMins: 30 });
      setLogin(data.accessToken, data); // Store token and user
      toast.success('Logged in successfully');
      onClose();
    } catch (error) {
      toast.error('Login failed. Check credentials.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleLogin} fullWidth>
          Login
        </Button>
        <Typography variant="body2" color="textSecondary">
          Use dummy creds, e.g., username: 'kminchelle', password: '0lelplR'
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;