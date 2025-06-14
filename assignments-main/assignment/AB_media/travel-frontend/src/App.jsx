import DestinationList from "./components/DestinationList";
import PackageList from "./components/PackageList";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h4" mt={4} mb={2}>
        Explore Most Popular Destinations
      </Typography>
      <DestinationList />

      <Typography variant="h4" mt={6} mb={2}>
        Top Selling Tour Packages of India
      </Typography>
      <PackageList />
    </Container>
  );
}

export default App;
