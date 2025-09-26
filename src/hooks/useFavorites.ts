import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { backendApi } from '../lib/axios';
import toast from 'react-hot-toast';

export const useFavorites = () => {
  return useQuery<string[], Error>({
    queryKey: ['favorites'],
    queryFn: async () => (await backendApi.get('/favorites')).data,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageUrl: string) => backendApi.post('/favorites', { imageUrl }),
    onMutate: async (imageUrl) => {
      const previous = queryClient.getQueryData<string[]>(['favorites']) || [];

      // Check if the image is already a favorite
      if (previous.includes(imageUrl)) {
        toast.success('This image is already a favorite!');
        return Promise.resolve();
      }

      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      queryClient.setQueryData(['favorites'], [...previous, imageUrl]);
      return { previous };
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(['favorites'], context?.previous);
      toast.error('Failed to add favorite');
    },
    onSuccess: () => toast.success('Added to favorites'),
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageUrl: string) => backendApi.delete(`/favorites/${encodeURIComponent(imageUrl)}`),
    onMutate: async (imageUrl) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      const previous = queryClient.getQueryData<string[]>(['favorites']) || [];
      queryClient.setQueryData(['favorites'], previous.filter((url) => url !== imageUrl));
      return { previous };
    },
    onError: (_err, _, context) => {
      queryClient.setQueryData(['favorites'], context?.previous);
      toast.error('Failed to remove favorite');
    },
    onSuccess: () => toast.success('Removed from favorites'),
  });
};