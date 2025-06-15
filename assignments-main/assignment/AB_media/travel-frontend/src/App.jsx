import { Container, Typography, Box } from "@mui/material";
import Hero from "./components/Hero";
import DestinationList from "./components/DestinationList";
import PackageList from "./components/PackageList";
import Advantages from "./components/Advantages";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <>
      <Hero />

      <Container sx={{ py: 5 }}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Explore Most Popular Destinations
          </Typography>
          <DestinationList />
        </Box>

        <Box mt={6}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Top Selling Tour Packages of India
          </Typography>
          <PackageList />
        </Box>

        <Advantages />
        <Testimonials />
      </Container>
    </>
  );
}

export default App;
