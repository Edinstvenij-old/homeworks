import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, Paper } from "@mui/material";

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = useSelector((state) =>
    state.hotels.hotels.find((h) => String(h.id) === id)
  );

  if (!hotel) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" align="center" color="error">
          Hotel not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {hotel.name || hotel.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Address: {hotel.address || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Rating: {hotel.hotel_rating || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Phone: {hotel.phone_number || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Country: {hotel.country_code || "N/A"}
        </Typography>
      </Paper>
    </Container>
  );
}
