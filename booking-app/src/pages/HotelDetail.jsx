import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  CircularProgress,
  Alert,
} from "@mui/material";
import { fetchHotels } from "../store/features/hotels/hotelsSlice";

export default function HotelDetail() {
  const { hotelId } = useParams();
  const dispatch = useDispatch();

  const { data: hotels, loading, error } = useSelector((state) => state.hotels);
  const hotel = useSelector((state) =>
    state.hotels.data.find((h) => String(h.id) === String(hotelId))
  );

  useEffect(() => {
    if (!hotels.length) {
      dispatch(fetchHotels());
    }
  }, [dispatch, hotels.length]);

  if (loading) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  if (!hotel) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">Отель не найден.</Typography>
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
      sx={{ mt: 4, maxWidth: 600, mx: "auto", borderRadius: 2, boxShadow: 4 }}
    >
      <CardMedia
        component="img"
        height="300"
        image={image || "/image/default-image.jpg"}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {name}
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
