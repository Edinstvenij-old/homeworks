import { useEffect, useMemo } from "react";
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
import { fetchHotels } from "../store/features/hotels/hotelsSlice";
import HotelCard from "../components/HotelCard";
import {
  makeSelectHotelsByCity,
  selectLoading,
  selectError,
} from "../store/selectors/hotelsSelectors";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Получаем город из location.state или оставляем пустую строку
  const selectedCity = location.state?.destination || "";

  // Мемоизированный селектор на основе makeSelectHotelsByCity
  const selectHotelsByCity = useMemo(makeSelectHotelsByCity, []);
  const hotels = useSelector((state) =>
    selectHotelsByCity(state, selectedCity)
  );

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (selectedCity) {
      console.log("Fetching hotels for city:", selectedCity);
      dispatch(fetchHotels(selectedCity));
    }
  }, [dispatch, selectedCity]);

  useEffect(() => {
    console.log("Received hotels data:", hotels);
  }, [hotels]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Hotels {selectedCity ? `in ${selectedCity}` : "List"}
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

      {!loading && !error && hotels.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {selectedCity
            ? `No hotels found in ${selectedCity}.`
            : "No available hotels."}
        </Typography>
      )}

      {!loading && !error && hotels.length > 0 && (
        <Grid container spacing={3} mt={2}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
