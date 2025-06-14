import { useQuery } from "react-query";
import { fetchTopPackages } from "../api/packages";
import { Card, CardContent, Typography, Grid, Skeleton } from "@mui/material";

const PackageList = () => {
  const { data, isLoading, error } = useQuery("top-packages", fetchTopPackages);

  if (isLoading) {
    return (
      <Grid container columns={12} columnSpacing={2} rowSpacing={2}>
        {[...Array(6)].map((_, i) => (
          <Grid key={i} columnSpan={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rectangular" height={150} />
            <Skeleton width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Typography color="error">Failed to load packages.</Typography>;
  }

  return (
    <Grid container columns={12} columnSpacing={2} rowSpacing={2}>
      {data?.map((item, index) => (
        <Grid key={index} columnSpan={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">{item.description}</Typography>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageList;
