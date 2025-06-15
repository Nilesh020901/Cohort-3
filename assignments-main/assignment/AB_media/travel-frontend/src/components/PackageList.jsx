import { useQuery } from "react-query";
import { fetchTopPackages } from "../api/packages";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Skeleton,
  CardMedia,
  Box,
} from "@mui/material";

const PackageList = () => {
  const { data, isLoading } = useQuery("top-packages", fetchTopPackages);

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Skeleton variant="rectangular" height={180} />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="180"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageList;
