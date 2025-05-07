import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  CircularProgress,
  Alert,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { fetchHotels } from "../store/features/hotels/hotelsSlice"; // Используй правильное действие
import HotelCard from "../components/HotelCard";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    data: hotels = [],
    loading,
    error,
  } = useSelector(
    (state) => state.hotels || {} // Защищаем от undefined
  );

  const city = location.state?.destination || "";

  useEffect(() => {
    dispatch(fetchHotels()); // Диспатчим правильное действие
  }, [dispatch]);

  const visibleHotels =
    city && typeof city === "string"
      ? hotels.filter(
          (hotel) =>
            hotel.city?.toLowerCase().trim() === city.toLowerCase().trim()
        )
      : hotels;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Hotels {city ? `in ${city}` : "List"}
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && visibleHotels.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {city ? `No hotels found in ${city}.` : "No hotels available."}
        </Typography>
      )}

      {!loading && !error && visibleHotels.length > 0 && (
        <Grid container spacing={3} mt={2}>
          {visibleHotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
