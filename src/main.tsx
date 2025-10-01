import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context'; // Import setContext
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import theme from './lib/muiTheme';
import App from './App.tsx';
import './app.css';
import { useAuthStore } from './store/authStore';

// Apollo Client setup
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Create an auth link that dynamically reads the token on every request
const authLink = setContext((_, { headers }) => {
  // IMPORTANT: Read the token fresh from the store on every request
  const token = useAuthStore.getState().token;
  
  console.log('Apollo Client - Current token:', token ? 'Present' : 'Missing'); // Debug log
  
  // Return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: Infinity,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);