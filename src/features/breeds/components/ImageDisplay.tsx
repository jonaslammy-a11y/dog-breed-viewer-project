import { Grid, Skeleton, Modal, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

type ImageDisplayProps = { images: string[]; isLoading: boolean; error?: Error };

const ImageDisplay = ({ images, isLoading, error }: ImageDisplayProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const handleOpen = (img: string) => {
    setSelectedImg(img);
    setOpenModal(true);
  };

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Skeleton variant="rectangular" height={200} />
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
        {images.map((url, i) => (
          <Grid item xs={12} sm={4} key={url}>
            <motion.img
              src={url}
              alt={`Dog image ${i + 1}`}
              loading="lazy"
              className="w-full h-auto cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleOpen(url)}
            />
          </Grid>
        ))}
      </Grid>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4">
          <IconButton className="absolute top-2 right-2" onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
          <img src={selectedImg} alt="Enlarged dog" className="max-h-[80vh]" />
        </Box>
      </Modal>
    </>
  );
};

export default ImageDisplay;