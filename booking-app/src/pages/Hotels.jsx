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
  selectHotelsData,
  selectLoading,
  selectError,
} from "../store/selectors/hotelsSelectors";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedCity = location.state?.destination || "";

  const hotelsData = useSelector(selectHotelsData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Оптимизация фильтрации отелей
  const hotels = useMemo(() => {
    console.log("Filtering hotels by city:", selectedCity);
    if (!selectedCity) return hotelsData; // Если город не выбран, показываем все отели
    return hotelsData.filter(
      (hotel) =>
        hotel.city?.toLowerCase().trim() === selectedCity.toLowerCase().trim()
    );
  }, [hotelsData, selectedCity]);

  useEffect(() => {
    dispatch(fetchHotels(selectedCity || undefined));
  }, [dispatch, selectedCity]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {selectedCity ? `Отели в ${selectedCity}` : "Все доступные отели"}
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
            ? `Нет отелей в ${selectedCity}.`
            : "Нет доступных отелей."}
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
