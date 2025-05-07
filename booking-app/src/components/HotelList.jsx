import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHotels } from "../store/features/hotels/hotelsSlice";
import HotelCard from "./HotelCard";
import { Typography, Grid, Box, CircularProgress, Alert } from "@mui/material";

const HotelList = ({ selectedCity }) => {
  const dispatch = useDispatch();
  const { data: hotels, loading, error } = useSelector((state) => state.hotels);

  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchHotels({ city: selectedCity }));
    } else {
      dispatch(fetchHotels()); // fallback — загрузить все, если нет фильтра
    }
  }, [dispatch, selectedCity]);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Hotels in {selectedCity || "all locations"}
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
          No hotels found in {selectedCity || "this area"}.
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
