import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import toast from 'react-hot-toast';

const GET_FAVORITES = gql`
  query GetFavorites {
    favoritesUrls
  }
`;

const ADD_FAVORITE = gql`
  mutation AddFavorite($imageUrl: String!) {
    addFavorite(input: { imageUrl: $imageUrl }) {
      id
      imageUrl
    }
  }
`;

const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($imageUrl: String!) {
    removeFavorite(imageUrl: $imageUrl)
  }
`;

// 1. Define the interface for the query result
interface GetFavoritesQueryResult {
  favoritesUrls: string[];
}

export const useFavoritesGraphQL = () => {
  // 2. Apply the interface to the useQuery hook
  const { data, loading, error, refetch } = useQuery<GetFavoritesQueryResult>(GET_FAVORITES);
  
  const [addFavoriteMutation] = useMutation(ADD_FAVORITE, {
    onCompleted: () => {
      toast.success('Added to favorites');
      refetch();
    },
    onError: (error) => {
      console.error('Add favorite error:', error);
      
      // Check for authentication-related errors
      if (error.message.includes('Unauthorized') || error.message.includes('UNAUTHENTICATED')) {
        toast.error('Please log in to add favorites');
        // Optionally redirect to login page
      } else if (error.message.includes('already favorited')) {
        toast.success('This image is already a favorite!');
      } else {
        toast.error('Failed to add favorite');
      }
    },
  });

  const [removeFavoriteMutation] = useMutation(REMOVE_FAVORITE, {
    onCompleted: () => {
      toast.success('Removed from favorites');
      refetch();
    },
    onError: (error) => {
      console.error('Remove favorite error:', error);
      
      // Add authentication error handling for remove as well
      if (error.message.includes('Unauthorized') || error.message.includes('UNAUTHENTICATED')) {
        toast.error('Please log in to remove favorites');
      } else {
        toast.error('Failed to remove favorite');
      }
    },
  });

  const addFavorite = (imageUrl: string) => {
    addFavoriteMutation({ variables: { imageUrl } });
  };

  const removeFavorite = (imageUrl: string) => {
    removeFavoriteMutation({ variables: { imageUrl } });
  };

  return {
    // 3. TypeScript now knows that `data?.favoritesUrls` is valid.
    data: data?.favoritesUrls || [],
    isLoading: loading,
    error,
    addFavorite,
    removeFavorite,
    refetch,
  };
};