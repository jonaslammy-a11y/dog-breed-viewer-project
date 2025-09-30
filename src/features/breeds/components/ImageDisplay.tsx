import { Grid, Skeleton, Modal, Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { useFavoritesGraphQL } from '../../../hooks/useFavoritesGraphQL';
import { useAuthStore } from '../../../store/authStore';

type ImageDisplayProps = { images: string[]; isLoading: boolean; error?: Error };

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1, // Reduced padding for a tighter fit around the image
  borderRadius: 2,
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ImageDisplay = ({ images, isLoading, error }: ImageDisplayProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const { data: favorites = [], addFavorite, removeFavorite } = useFavoritesGraphQL();
  const { user } = useAuthStore();

  const handleOpen = (img: string) => {
    setSelectedImg(img);
    setOpenModal(true);
  };

  const handleFavoriteToggle = (imageUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyFavorite = favorites.includes(imageUrl);
    if (isCurrentlyFavorite) {
      removeFavorite(imageUrl);
    } else {
      addFavorite(imageUrl);
    }
  };

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Grid size={{ xs: 6, sm: 4 }} key={i}>
            {/* Make skeleton match the new aspect ratio */}
            <Skeleton variant="rectangular" sx={{ aspectRatio: '1 / 1', borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {images.map((url) => {
          const isFavorited = favorites.includes(url);
          const isLoggedIn = !!user;

          return (
            <Grid size={{ xs: 6, sm: 4 }} key={url}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => handleOpen(url)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    // Enforce a square aspect ratio for a uniform grid
                    aspectRatio: '1 / 1',
                  }}
                >
                  <img
                    src={url}
                    alt="A cute dog"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {isLoggedIn && (
                    <IconButton
                      onClick={(e) => handleFavoriteToggle(url, e)}
                      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: isFavorited ? 'red' : 'inherit',
                        '&:hover': {
                          backgroundColor: 'white',
                          transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    >
                      {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  )}
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImg}
            alt="Enlarged dog"
            style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '4px' }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ImageDisplay;