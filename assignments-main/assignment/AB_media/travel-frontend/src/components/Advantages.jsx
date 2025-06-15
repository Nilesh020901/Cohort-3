import { Grid, Typography, Box, Paper } from "@mui/material";
import { FaClock, FaMoneyBillWave, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

const advantages = [
  { icon: <FaClock />, title: "Save Time", desc: "No more switching for packages or plans." },
  { icon: <FaMoneyBillWave />, title: "Save Money", desc: "Compare, negotiate, and choose the best." },
  { icon: <FaUsers />, title: "Trusted Network", desc: "7000+ Verified Travel Agents." },
  { icon: <FaMapMarkedAlt />, title: "Multiple Options", desc: "Itineraries & Tips from real travelers." },
];

const Advantages = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        gutterBottom
      >
        Our Advantages
      </Typography>

      <Grid container spacing={2} mt={3} justifyContent="center">
        {advantages.map((adv, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box fontSize={40} mb={2} color="primary.main">
                {adv.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {adv.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {adv.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Advantages;
