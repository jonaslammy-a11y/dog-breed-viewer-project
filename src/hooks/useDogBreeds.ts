import { useQuery } from '@tanstack/react-query';
import { fetchAllBreeds } from '../api/dogApi';

export const useDogBreeds = () => {
  return useQuery<string[], Error>({
    queryKey: ['breeds'],
    queryFn: fetchAllBreeds,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours cache
    gcTime: Infinity,
    retry: false, // Handled by retry-axios
  });
};