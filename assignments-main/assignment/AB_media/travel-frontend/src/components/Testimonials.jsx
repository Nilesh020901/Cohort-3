import { Box, Typography, Grid, Paper } from "@mui/material";

const testimonials = [
  { name: "Amit Sharma", company: "Frequent Traveler", text: "Best booking experience ever!" },
  { name: "Ritika Singh", company: "Corporate Employee", text: "Packages were affordable and well-planned." },
  { name: "Rahul Verma", company: "Digital Nomad", text: "Trusted agents and great options." },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
        Testimonials
      </Typography>
      <Grid container spacing={3} mt={2}>
        {testimonials.map((t, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="body1" fontStyle="italic">"{t.text}"</Typography>
              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight={600}>{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">{t.company}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
