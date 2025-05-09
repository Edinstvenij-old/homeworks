import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import HotelCard from "../components/HotelCard";
import { fetchHotelsRequest } from "../store/features/hotels/hotelsSlice";
import { useLocation } from "react-router-dom";

export default function Hotels() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const destinationId = searchParams.get("destinationId");
  const city = searchParams.get("city");
  const priceFrom = parseFloat(searchParams.get("priceFrom")) || 0;
  const priceTo = parseFloat(searchParams.get("priceTo")) || Infinity;

  useEffect(() => {
    // Можно передавать destinationId, если сервер умеет фильтровать
    dispatch(fetchHotelsRequest(destinationId));
  }, [dispatch, destinationId]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchDestination =
        !destinationId || hotel.destinationId === +destinationId;
      const matchCity =
        !city || hotel.city?.toLowerCase().includes(city.toLowerCase());
      const matchPrice = hotel.price >= priceFrom && hotel.price <= priceTo;

      return matchDestination && matchCity && matchPrice;
    });
  }, [hotels, destinationId, city, priceFrom, priceTo]);

  if (loading) {
    return (
      <Box
        py={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        width="100%"
        sx={{ backgroundColor: "#f0f0f0" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={6} width="100%" sx={{ backgroundColor: "#f0f0f0" }}>
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
        backgroundColor: "#3f3f3f",
        minHeight: "100%",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          color: "#f0f0f0",
          textShadow: "1px 1px 3px #ffeb3b",
        }}
      >
        Available Hotels
      </Typography>

      {filteredHotels.length > 0 ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            overflowY: "auto",
            maxHeight: "80vh",
            width: "100%",
            padding: 5,
            overflowX: "hidden",
          }}
        >
          {filteredHotels.map((hotel) => (
            <Grid
              item
              key={hotel.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box mt={4} width="100%">
          <Typography variant="h6" color="text.secondary" align="center">
            No hotels found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
