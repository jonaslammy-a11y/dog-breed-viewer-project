import { useState } from 'react';
import { FixedSizeList } from 'react-window'; // Corrected import
import { Skeleton, TextField, Typography, Button, ListItem, ListItemText } from '@mui/material';
import { useDogBreeds } from '../../../hooks/useDogBreeds';
import { useDogStore } from '../../../store/dogStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { useDogImages } from '../../../hooks/useDogImages'; // Import the hook for fetching dog images
import ImageDisplay from './ImageDisplay'; // Import the ImageDisplay component

const ITEM_HEIGHT = 48; // For virtualization

const BreedViewer = () => {
  const { data: breeds, isLoading, error, refetch } = useDogBreeds();
  const { selectedBreed, setSelectedBreed } = useDogStore(); // Destructure selectedBreed
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm.toLowerCase());

  // Fetch images for the selected breed
  const { data: images = [], isLoading: loadingImages, error: imageError } = useDogImages(selectedBreed);

  const filteredBreeds = breeds?.filter((breed) =>
    breed.toLowerCase().includes(debouncedSearch)
  ) || [];

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton variant="rectangular" height={40} /> {/* Search skeleton */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={ITEM_HEIGHT} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <Typography color="error">{error.message}</Typography>
        <Button variant="contained" onClick={refetch}>Retry</Button>
      </div>
    );
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const breed = filteredBreeds[index];
    return (
      <ListItem button onClick={() => setSelectedBreed(breed)} key={breed} style={style}>
        <ListItemText primary={breed} />
      </ListItem>
    );
  };

  return (
    <div className="space-y-4">
      <TextField
        label="Search breeds"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search breeds"
      />
      <Typography variant="h6">Breeds</Typography>
      <FixedSizeList
        height={400} // Fixed height for scroll
        itemCount={filteredBreeds.length}
        itemSize={ITEM_HEIGHT}
        width="100%"
      >
        {Row}
      </FixedSizeList>

      {/* Display images for the selected breed */}
      {selectedBreed && (
        <div className="mt-8">
          <Typography variant="h6">Images for {selectedBreed}</Typography>
          <ImageDisplay images={images} isLoading={loadingImages} error={imageError} />
        </div>
      )}
    </div>
  );
};

export default BreedViewer;