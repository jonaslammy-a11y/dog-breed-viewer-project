import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BreedViewer from '../../src/features/breeds/components/BreedViewer';
import { useDogStore } from '../../src/store/dogStore';

// Mock the hooks and store
jest.mock('../../src/hooks/useDogBreeds');
jest.mock('../../src/hooks/useDogImages');
jest.mock('../../src/store/dogStore');
jest.mock('../../src/hooks/useFavorites');
jest.mock('../../src/hooks/useDebounce');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

// Mock the useDebounce hook to return the value immediately
const mockUseDebounce = jest.requireMock('../../src/hooks/useDebounce');
mockUseDebounce.useDebounce = jest.fn((value) => value);

beforeEach(() => {
  // Reset all mocks
  jest.clearAllMocks();
  
  // Default mock for useDogStore
  useDogStore.mockReturnValue({ 
    selectedBreed: null, 
    setSelectedBreed: jest.fn() 
  });
});

test('renders loading state', () => {
  const { useDogBreeds } = require('../../src/hooks/useDogBreeds');
  useDogBreeds.mockReturnValue({ 
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

  // Check for search input (which is not an image)
  expect(screen.getByLabelText(/Search breeds/i)).toBeInTheDocument();
  
  // The skeletons are not images - they're MUI Skeleton components
  // We should check for the loading state differently
  expect(screen.getByRole('progressbar')).toBeInTheDocument(); // MUI Skeleton has progressbar role
});

test('renders error state with retry button', () => {
  const { useDogBreeds } = require('../../src/hooks/useDogBreeds');
  const mockRefetch = jest.fn();
  
  useDogBreeds.mockReturnValue({ 
    data: undefined, 
    isLoading: false, 
    error: new Error('Failed to fetch breeds'), 
    refetch: mockRefetch 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Check for the error message - use the actual error message
  expect(screen.getByText(/Failed to fetch breeds/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();
});

test('searches and selects breed', () => {
  const { useDogBreeds } = require('../../src/hooks/useDogBreeds');
  const { useDogImages } = require('../../src/hooks/useDogImages');
  
  const setSelectedBreed = jest.fn();
  const mockBreeds = ['bulldog', 'beagle', 'poodle'];
  
  useDogStore.mockReturnValue({ 
    selectedBreed: null, 
    setSelectedBreed 
  });
  
  useDogBreeds.mockReturnValue({ 
    data: mockBreeds, 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });
  
  // Mock useDogImages to return empty array when no breed is selected
  useDogImages.mockReturnValue({ 
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
  fireEvent.change(searchInput, { target: { value: 'bul' } });
  
  // Verify the search worked
  expect(searchInput).toHaveValue('bul');
  
  // Click on the bulldog breed
  const bulldogItem = screen.getByText('bulldog');
  fireEvent.click(bulldogItem);
  
  // Verify setSelectedBreed was called
  expect(setSelectedBreed).toHaveBeenCalledWith('bulldog');
});

test('displays images when breed is selected', () => {
  const { useDogBreeds } = require('../../src/hooks/useDogBreeds');
  const { useDogImages } = require('../../src/hooks/useDogImages');
  const { useFavorites } = require('../../src/hooks/useFavorites');
  
  const mockImages = [
    'https://images.dog.ceo/breeds/bulldog/image1.jpg',
    'https://images.dog.ceo/breeds/bulldog/image2.jpg'
  ];
  
  useDogStore.mockReturnValue({ 
    selectedBreed: 'bulldog', 
    setSelectedBreed: jest.fn() 
  });
  
  useDogBreeds.mockReturnValue({ 
    data: ['bulldog', 'beagle'], 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });
  
  useDogImages.mockReturnValue({ 
    data: mockImages, 
    isLoading: false, 
    error: undefined 
  });
  
  // Mock favorites hook
  useFavorites.useFavorites = jest.fn().mockReturnValue({
    data: [],
    isLoading: false
  });
  
  useFavorites.useAddFavorite = jest.fn().mockReturnValue({
    mutate: jest.fn()
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Check that images are displayed
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(mockImages.length);
  
  // Check that the breed title is displayed
  expect(screen.getByText(/Images for bulldog/i)).toBeInTheDocument();
});

test('displays no results when search yields no matches', () => {
  const { useDogBreeds } = require('../../src/hooks/useDogBreeds');
  const { useDogImages } = require('../../src/hooks/useDogImages');
  
  const mockBreeds = ['bulldog', 'beagle', 'poodle'];
  
  useDogStore.mockReturnValue({ 
    selectedBreed: null, 
    setSelectedBreed: jest.fn() 
  });
  
  useDogBreeds.mockReturnValue({ 
    data: mockBreeds, 
    isLoading: false, 
    error: undefined, 
    refetch: jest.fn() 
  });
  
  useDogImages.mockReturnValue({ 
    data: [], 
    isLoading: false, 
    error: undefined 
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BreedViewer />
    </QueryClientProvider>
  );

  // Search for a non-existent breed
  const searchInput = screen.getByLabelText(/Search breeds/i);
  fireEvent.change(searchInput, { target: { value: 'xyz' } });
  
  // No breeds should be displayed
  const breedItems = screen.queryAllByRole('button');
  expect(breedItems).toHaveLength(0);
});