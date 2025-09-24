import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize to match Tailwind if needed
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Or match Tailwind font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Customize as needed
        },
      },
    },
  },
});

export default theme;