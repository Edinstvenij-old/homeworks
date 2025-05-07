import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
} from "@mui/material";

export default function HotelDetail() {
  const { hotelId } = useParams();
  const hotel = useSelector((state) =>
    state.hotels.data.find((h) => String(h.id) === hotelId)
  );

  if (!hotel) {
    return (
      <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
        Hotel not found.
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        mt: 4,
        maxWidth: 600,
        mx: "auto",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={hotel.image || "/image/default-image.jpg"}
        alt={hotel.name || "Hotel"}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {hotel.name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Address: {hotel.address || "N/A"}, {hotel.city || "N/A"}
        </Typography>

        <Box mt={1} display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Rating:
          </Typography>
          <Rating
            value={Number(hotel.hotel_rating) || 0}
            precision={0.5}
            readOnly
          />
        </Box>

        <Typography variant="h6" mt={2}>
          Price: ${hotel.price_per_night || "N/A"} / night
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={2}>
          Description: {hotel.description || "No description available."}
        </Typography>
      </CardContent>
    </Card>
  );
}
