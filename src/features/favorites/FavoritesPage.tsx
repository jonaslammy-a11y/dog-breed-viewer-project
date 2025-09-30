import { Grid, Typography, IconButton, Card, CardMedia, CardActions, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavoritesGraphQL } from '../../hooks/useFavoritesGraphQL';

const FavoritesPage = () => {
  const { data: favorites = [], isLoading, removeFavorite } = useFavoritesGraphQL();

  if (isLoading) return <Typography>Loading favourites...</Typography>;

  return (
    <div className="space-y-4">
      <Typography variant="h5">My Favourites</Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet. Add some dog images to your favorites!</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((url : string) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={url}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
                  <CardMedia
                    component="img"
                    image={url}
                    alt="Favorite dog"
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <CardActions sx={{ p: 1, mt: 'auto' }}>
                  <IconButton 
                    onClick={() => removeFavorite(url)}
                    color="error"
                    aria-label="Remove from favorites"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default FavoritesPage;