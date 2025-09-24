import { useQuery } from '@tanstack/react-query';
import { fetchRandomImages } from '../api/dogApi';

export const useDogImages = (breed: string | null) => {
  return useQuery<string[], Error>({
    queryKey: ['images', breed],
    queryFn: () => fetchRandomImages(breed!),
    enabled: !!breed, // Only fetch if breed selected
    staleTime: 1000 * 60 * 5, // 5 min cache for images
  });
};