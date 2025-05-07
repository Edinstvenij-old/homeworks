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
import { fetchHotelsRequest } from "../store/features/hotels/hotelsSlice";
import HotelCard from "../components/HotelCard";
import { selectMemoizedHotels } from "../store/selectors";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedCity = location.state?.destination || "";

  const {
    data: hotels = [],
    loading,
    error,
  } = useSelector(selectMemoizedHotels);

  useEffect(() => {
    // если есть выбранный город — фильтруем по нему
    if (selectedCity) {
      dispatch(fetchHotelsRequest({ city: selectedCity }));
    } else {
      dispatch(fetchHotelsRequest());
    }
  }, [dispatch, selectedCity]);

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
            ? `Отели не найдены в ${selectedCity}.`
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
