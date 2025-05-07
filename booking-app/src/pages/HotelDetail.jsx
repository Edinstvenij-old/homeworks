import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  CircularProgress,
} from "@mui/material";

export default function HotelDetail() {
  const { hotelId } = useParams();
  const hotel = useSelector((state) =>
    state.hotels.data.find((h) => String(h.id) === hotelId)
  );

  // Если данных о отеле нет
  if (!hotel) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Отель не найден.
        </Typography>
      </Box>
    );
  }

  const {
    name,
    image,
    address,
    city,
    hotel_rating,
    price_per_night,
    description,
  } = hotel;

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
        image={image || "/image/default-image.jpg"}
        alt={name || "Hotel"}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {name || "Unnamed Hotel"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Address: {address || "N/A"}, {city || "N/A"}
        </Typography>

        <Box mt={1} display="flex" alignItems="center">
          <Typography variant="body2" mr={1}>
            Rating:
          </Typography>
          <Rating value={Number(hotel_rating) || 0} precision={0.5} readOnly />
        </Box>

        <Typography variant="h6" mt={2}>
          Price: ${price_per_night || "N/A"} / night
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={2}>
          Description: {description || "No description available."}
        </Typography>
      </CardContent>
    </Card>
  );
}
