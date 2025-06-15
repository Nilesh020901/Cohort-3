import { useQuery } from "react-query";
import { fetchDestinations } from "../api/destination";
import {
  Card,
  CardContent,
  Typography,
  Skeleton,
  CardMedia,
  Box,
} from "@mui/material";
import Slider from "react-slick";

const DestinationList = () => {
  const { data, isLoading } = useQuery("destinations", fetchDestinations);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,      // desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 960, // tab
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // mob
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <Box display="flex" gap={2}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} width={300}>
            <Skeleton variant="rectangular" height={180} />
            <Skeleton width="80%" />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <Box key={index} px={1}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="180"
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.price}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default DestinationList;
