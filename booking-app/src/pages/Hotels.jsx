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
      <Box
        py={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        width="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={6} width="100%">
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      py={6}
      sx={{
        minHeight: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, // Чтобы раздел занимал всё доступное пространство
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Available Hotels
      </Typography>

      {hotels.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            overflowY: "auto", // Для прокрутки карточек
            maxHeight: "80vh", // Ограничиваем высоту для карточек, чтобы они могли прокручиваться
            width: "100%",
            padding: 2,
          }}
        >
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Box>
      ) : (
        <Box mt={4} width="100%">
          <Typography variant="h6" color="text.secondary" align="center">
            No hotels available at the moment.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
