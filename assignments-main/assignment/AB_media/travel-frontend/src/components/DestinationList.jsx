import { useQuery } from "react-query";
import { fetchDestinations } from "../api/destination";
import { Card, CardContent, Typography, Grid, Skeleton } from "@mui/material";

const DestinationList = () => {
  const { data, isLoading, error } = useQuery("destinations", fetchDestinations);

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
    return <Typography color="error">Failed to load destinations.</Typography>;
  }

  return (
    <Grid container columns={12} columnSpacing={2} rowSpacing={2}>
      {data?.map((item, index) => (
        <Grid key={index} columnSpan={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">{item.price}</Typography>
              <img src={item.image} alt={item.name} style={{ width: "100%", height: 150 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DestinationList;
