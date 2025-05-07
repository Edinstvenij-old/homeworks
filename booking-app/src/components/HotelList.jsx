import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHotels } from "../store/features/hotels/hotelsSlice";
import HotelCard from "./HotelCard";
import { Typography, Grid, Box, CircularProgress, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

const HotelList = ({ selectedCity: propCity }) => {
  const dispatch = useDispatch();
  const { data: hotels, loading, error } = useSelector((state) => state.hotels);
  const location = useLocation();

  // Получаем город: сначала из пропсов, если нет — из location.state
  const selectedCity = propCity || location.state?.destination || null;

  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchHotels({ city: selectedCity }));
    } else {
      dispatch(fetchHotels()); // fallback — загрузить все
    }
  }, [dispatch, selectedCity]);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Отели в {selectedCity || "all locations"}
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && hotels.length === 0 && (
        <Typography>
          Отели не найдены в {selectedCity || "this area"}.
        </Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <HotelCard hotel={hotel} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HotelList;
