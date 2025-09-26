import { useState } from 'react';
import { Skeleton, TextField, Typography, Button, ListItemText, ListItemButton } from '@mui/material';
import { useDogBreeds } from '../../../hooks/useDogBreeds';
import { useDogStore } from '../../../store/dogStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { useDogImages } from '../../../hooks/useDogImages';
import ImageDisplay from './ImageDisplay';

const ITEM_HEIGHT = 48;

const BreedViewer = () => {
  const { data: breeds, isLoading, error, refetch } = useDogBreeds();
  const { selectedBreed, setSelectedBreed } = useDogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm.toLowerCase());

  const { data: images = [], isLoading: loadingImages, error: imageError } = useDogImages(selectedBreed);

  const filteredBreeds = (breeds as string[] || []).filter((breed: string) =>
    breed.toLowerCase().includes(debouncedSearch)
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton variant="rectangular" height={40} />
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
        <Button variant="contained" onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Breed list */}
      <div className="lg:col-span-1 space-y-4">
        <TextField
          label="Search breeds"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search breeds"
          aria-controls="breed-list"
        />
        <Typography variant="h6">Breeds</Typography>
        
        <div 
          style={{ 
            height: 300,
            overflow: 'auto',
            border: '1px solid #e0e0e0',
            borderRadius: '4px'
          }} 
          aria-label="breed-list"
        >
          {filteredBreeds.map((breed) => (
            <ListItemButton 
              key={breed} 
              onClick={() => setSelectedBreed(breed)}
              style={{ height: ITEM_HEIGHT }}
              selected={selectedBreed === breed}
            >
              <ListItemText primary={breed} />
            </ListItemButton>
          ))}
        </div>
      </div>

      {/* Right column - Images (only show when breed is selected) */}
      <div className="lg:col-span-2">
        {selectedBreed && (
          <div>
            <Typography variant="h5" gutterBottom>
              Images for {selectedBreed}
            </Typography>
            <ImageDisplay images={images} isLoading={loadingImages} error={imageError || undefined} />
          </div>
        )}
        
        {/* Empty state */}
        {!selectedBreed && (
          <div className="text-center py-12 text-gray-500">
            <Typography variant="h6">
              Select a breed to view images
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedViewer;