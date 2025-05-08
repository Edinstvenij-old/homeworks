import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { fetchHotelsRequest } from "../features/hotels/hotelsSlice";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotels, loading } = useSelector((state) => state.hotels);
  const hotel = hotels.find((h) => String(h.id) === id);

  useEffect(() => {
    if (!hotels.length) {
      dispatch(fetchHotelsRequest());
    }
  }, [dispatch, hotels.length]);

  if (loading) {
    return (
      <Box
        sx={{
          mt: 4,
          px: 2,
          textAlign: "center",
          backgroundColor: "#3f3f3f",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Typography variant="h6">Loading hotel...</Typography>
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box
        sx={{
          mt: 4,
          px: 2,
          backgroundColor: "#3f3f3f",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Typography variant="h6" align="center" color="error">
          Hotel not found
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 0,
        px: 2,
        width: "100vw",
        backgroundColor: "#3f3f3f",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 800,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 0 12px rgba(255, 235, 59, 0.3)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 0 24px rgba(255, 235, 59, 0.7)",
          },
        }}
      >
        <CardMedia
          component="img"
          alt={hotel.name || "Hotel Image"}
          height="300"
          image={hotel.image || "/image/default-image.jpg"}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", color: "#212121" }}
          >
            {hotel.name || "N/A"}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Address:</strong> {hotel.address || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>City:</strong> {hotel.city || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>State:</strong> {hotel.state || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Country:</strong> {hotel.country_code || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Rating:</strong> {hotel.hotel_rating || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong> {hotel.phone_number || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Website:</strong> {hotel.website || "N/A"}
          </Typography>

          <Box textAlign="center">
            <Button variant="contained" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
