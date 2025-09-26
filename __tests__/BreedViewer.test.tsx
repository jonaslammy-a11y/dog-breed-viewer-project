import { jest, test, expect, beforeEach } from '@jest/globals';
//import { render, screen, fireEvent } from '@testing-library/react';
import { customRender as render, screen, fireEvent } from '../src/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BreedViewer from '../src/features/breeds/components/BreedViewer';

// Mock the hooks and store
jest.mock('../src/hooks/useDogBreeds');
jest.mock('../src/hooks/useDogImages');
jest.mock('../src/store/dogStore');
jest.mock('../src/store/authStore');
jest.mock('../src/hooks/useFavorites');
jest.mock('../src/hooks/useDebounce');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

// Mock the useDebounce hook to return the value immediately
jest.mock('../src/hooks/useDebounce', () => ({
  useDebounce: jest.fn((value) => value),
}));

// Mock the useFavorites hook
jest.mock('../src/hooks/useFavorites', () => ({
  useFavorites: jest.fn().mockReturnValue({
    data: [],
    isLoading: false,
  }),
  useAddFavorite: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
  useRemoveFavorite: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

// Create proper mock functions for the stores
const mockUseAuthStore = jest.fn();
const mockUseDogStore = jest.fn();

jest.mock('../src/store/authStore', () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

jest.mock('../src/store/dogStore', () => ({
  useDogStore: () => mockUseDogStore(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  
  // Mock user as NOT logged in by default
  mockUseAuthStore.mockReturnValue({ 
    user: null,
    token: null
  });
  
  // Default mock for useDogStore
  mockUseDogStore.mockReturnValue({ 
    selectedBreed: null, 
    setSelectedBreed: jest.fn() 
  });
});

test('renders breed search and list when not logged in', () => {
  const { useDogBreeds } = require('../src/hooks/useDogBreeds');
  (useDogBreeds as jest.Mock).mockReturnValue({ 
    data: ['bulldog', 'beagle', 'poodle'], 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Should show search input and breed list even when not logged in
  expect(screen.getByLabelText(/Search breeds/i)).toBeInTheDocument();
  expect(screen.getByText('bulldog')).toBeInTheDocument();
  expect(screen.getByText('beagle')).toBeInTheDocument();
});

test('shows loading state for breeds', () => {
  const { useDogBreeds } = require('../src/hooks/useDogBreeds');
  (useDogBreeds as jest.Mock).mockReturnValue({ 
    data: undefined, 
    isLoading: true, 
    error: undefined, 
    refetch: jest.fn() 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('allows searching and selecting a breed', () => {
  const { useDogBreeds } = require('../src/hooks/useDogBreeds');
  const { useDogImages } = require('../src/hooks/useDogImages');
  
  const setSelectedBreed = jest.fn();
  const mockBreeds = ['bulldog', 'beagle', 'poodle'];
  
  mockUseDogStore.mockReturnValue({ 
    selectedBreed: null, 
    setSelectedBreed 
  });
  
  (useDogBreeds as jest.Mock).mockReturnValue({ 
    data: mockBreeds, 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });
  
  // Mock empty images initially (no breed selected)
  (useDogImages as jest.Mock).mockReturnValue({ 
    data: [], 
    isLoading: false, 
    error: undefined 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Search for a breed
  const searchInput = screen.getByLabelText(/Search breeds/i);
  fireEvent.change(searchInput, { target: { value: 'bulldog' } });
  
  // Use toBe instead of toHaveValue for simpler assertion
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('bulldog');
  
  // Click on the bulldog breed
  const bulldogItem = screen.getByText('bulldog');
  fireEvent.click(bulldogItem);
  
  expect(setSelectedBreed).toHaveBeenCalledWith('bulldog');
});

test('displays images when breed is selected', () => {
  const { useDogBreeds } = require('../src/hooks/useDogBreeds');
  const { useDogImages } = require('../src/hooks/useDogImages');
  
  const mockImages = [
    'https://images.dog.ceo/breeds/bulldog/image1.jpg',
    'https://images.dog.ceo/breeds/bulldog/image2.jpg'
  ];
  
  mockUseDogStore.mockReturnValue({ 
    selectedBreed: 'bulldog', 
    setSelectedBreed: jest.fn() 
  });
  
  (useDogBreeds as jest.Mock).mockReturnValue({ 
    data: ['bulldog', 'beagle'], 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });
  
  (useDogImages as jest.Mock).mockReturnValue({ 
    data: mockImages, 
    isLoading: false, 
    error: undefined 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Should show images when breed is selected
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(mockImages.length);
  
  // Should show the breed title
  expect(screen.getByText(/Images for bulldog/i)).toBeInTheDocument();
});

test('shows empty state when no breed selected', () => {
  const { useDogBreeds } = require('../src/hooks/useDogBreeds');
  
  (useDogBreeds as jest.Mock).mockReturnValue({ 
    data: ['bulldog', 'beagle'], 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Should show empty state message when no breed is selected
  expect(screen.getByText(/Select a breed to view images/i)).toBeInTheDocument();
});