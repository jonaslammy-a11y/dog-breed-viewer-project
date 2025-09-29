import { jest } from '@jest/globals';
export const useDogImages = jest.fn().mockReturnValue({
  data: [],
  isLoading: false,
  error: undefined
});