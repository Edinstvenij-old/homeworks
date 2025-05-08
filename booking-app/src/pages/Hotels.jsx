import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import HotelCard from "../components/HotelCard";
import { fetchHotelsRequest } from "../features/hotels/hotelsSlice";
import { useLocation } from "react-router-dom";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const destinationId = searchParams.get("destinationId");

    if (destinationId) {
      dispatch(fetchHotelsRequest(destinationId));
    } else {
      dispatch(fetchHotelsRequest());
    }
  }, [dispatch, location.search]);

  if (loading) {
    return (
      <Box py={6} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={6}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="section" py={6}>
      <Typography variant="h4" gutterBottom>
        Available Hotels
      </Typography>

      {hotels.length > 0 ? (
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box mt={4}>
          <Typography variant="h6" color="text.secondary" align="center">
            No hotels available at the moment.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
