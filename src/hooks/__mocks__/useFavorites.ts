import { jest } from '@jest/globals';
export const useFavorites = jest.fn().mockReturnValue({
  data: [],
  isLoading: false
});

export const useAddFavorite = jest.fn().mockReturnValue({
  mutate: jest.fn()
});

export const useRemoveFavorite = jest.fn().mockReturnValue({
  mutate: jest.fn()
});