import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, Paper, Button, Box } from "@mui/material";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = useSelector((state) =>
    state.hotels.hotels.find((h) => String(h.id) === id)
  );

  if (!hotel) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" align="center" color="error">
          Hotel not found
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          {hotel.name || hotel.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Address:</strong> {hotel.address || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Rating:</strong> {hotel.hotel_rating || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Phone:</strong> {hotel.phone_number || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Country:</strong> {hotel.country_code || "N/A"}
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>
    </Container>
  );
}
