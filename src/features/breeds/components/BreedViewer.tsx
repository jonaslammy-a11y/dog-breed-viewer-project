import { useState } from 'react';
import {
  Skeleton, TextField, Typography, Button, ListItemText, ListItemButton, Paper, Box, Grid, List
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { useDogBreeds } from '../../../hooks/useDogBreeds';
import { useDogStore } from '../../../store/dogStore';
import { useDebounce } from '../../../hooks/useDebounce';
import { useDogImages } from '../../../hooks/useDogImages';
import ImageDisplay from './ImageDisplay';

const BreedViewer = () => {
  const { data: breeds, isLoading, error, refetch } = useDogBreeds();
  const { selectedBreed, setSelectedBreed } = useDogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm.toLowerCase());

  const { data: images = [], isLoading: loadingImages, error: imageError } = useDogImages(selectedBreed);

  const filteredBreeds = (breeds as string[] || []).filter((breed: string) =>
    breed.toLowerCase().includes(debouncedSearch)
  );

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error.message}</Typography>
        <Button variant="contained" onClick={() => refetch()} sx={{ mt: 2 }}>Retry</Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {/* Left column - Breed list */}
      {/* KEY CHANGE: Added sx prop to constrain height on medium screens and up */}
     <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ height: { md: 'calc(100vh - 128px)' } }}>
        <Paper
          elevation={2}
          sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Typography variant="h6" gutterBottom>
            Dog Breeds
          </Typography>
          <TextField
            label="Search breeds"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search breeds"
            aria-controls="breed-list"
            sx={{ mb: 2 }}
          />
          {isLoading ? (
            <Box>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={48} sx={{ my: 0.5, borderRadius: 1 }} />
              ))}
            </Box>
          ) : (
            <List
              sx={{
                flexGrow: 1, // Allows the list to fill the available space
                overflow: 'auto', // This makes the list itself scrollable
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1
              }}
              aria-label="breed-list"
            >
              {filteredBreeds.map((breed) => (
                <ListItemButton
                  key={breed}
                  onClick={() => setSelectedBreed(breed)}
                  selected={selectedBreed === breed}
                >
                  <ListItemText primary={breed} />
                </ListItemButton>
              ))}
            </List>
          )}
        </Paper>
      </Grid>

      {/* Right column - Images */}
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        {selectedBreed ? (
          <Box>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textTransform: 'capitalize' }}>
              {selectedBreed}
            </Typography>
            <ImageDisplay images={images} isLoading={loadingImages} error={imageError || undefined} />
          </Box>
        ) : (
          // Enhanced Empty state
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '60vh',
              color: 'text.secondary',
              border: '2px dashed',
              borderColor: 'divider'
            }}
          >
            <PetsIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6">
              Select a breed to view images
            </Typography>
            <Typography variant="body1">
              Choose from the list on the left to get started.
            </Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default BreedViewer;