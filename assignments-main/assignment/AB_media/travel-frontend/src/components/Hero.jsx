import { Box, Typography, Button } from "@mui/material";
import bannerImg from '../assets/banner.jpg';

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '400px', md: '500px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        overflow: 'hidden',
        px: 2,
      }}
    >
      <Box sx={{ zIndex: 2 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Discover Your Next Adventure
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Choose from our curated experiences, customized for every kind of traveler.
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Book Now
        </Button>
      </Box>

      {/* Optional: Overlay for better text visibility */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Hero;
