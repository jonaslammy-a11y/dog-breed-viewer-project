import { Grid, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavorites, useRemoveFavorite }  from "../../hooks/useFavorites";

const FavoritesPage = () => {
  const { data: favorites = [], isLoading } = useFavorites();
  const { mutate: removeFavorite } = useRemoveFavorite();

  if (isLoading) return <Typography>Loading favourites...</Typography>;

  return (
    <div className="space-y-4">
      <Typography variant="h5">My Favourites</Typography>
      <Grid container spacing={2}>
        {favorites.map((url) => (
          <Grid
            key={url}
            size={{ xs: 12, sm: 4 }}
          >
            <img src={url} alt="Favorite dog" className="w-full h-auto" />
            <IconButton onClick={() => removeFavorite(url)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoritesPage;