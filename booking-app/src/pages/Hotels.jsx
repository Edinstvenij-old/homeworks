import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import HotelCard from "../components/HotelCard";
import { fetchHotelsRequest } from "../features/hotels/hotelsSlice";
import { useLocation } from "react-router-dom";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { hotels = [], loading, error } = useSelector((state) => state.hotels);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const destinationId = location.state?.destinationId;

    setSelectedDestination(destinationId || null);
    dispatch(fetchHotelsRequest(destinationId || null));
  }, [dispatch, location.state]);

  // Фильтрация отелей, если есть destinationId
  const filteredHotels = selectedDestination
    ? hotels.filter(
        (hotel) => String(hotel.destinationId) === String(selectedDestination)
      )
    : hotels;

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Hotels
      </Typography>

      {filteredHotels.length > 0 ? (
        <Grid container spacing={3}>
          {filteredHotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="text.secondary" align="center">
            No hotels available at the moment.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
