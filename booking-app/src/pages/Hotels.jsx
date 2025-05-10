import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Grid, Typography, CircularProgress, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HotelCard from "../components/hotel/HotelCard";
import { fetchHotelsRequest } from "../store/features/hotels/hotelsSlice";

export default function Hotels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { hotels, loading, error } = useSelector((state) => state.hotels);

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const destinationIdParam = searchParams.get("destinationId");
  const cityFilter = searchParams.get("city");
  const priceFrom = parseFloat(searchParams.get("priceFrom")) || 0;
  const priceTo = parseFloat(searchParams.get("priceTo")) || Infinity;

  const destinationId = destinationIdParam
    ? parseInt(destinationIdParam)
    : null;

  useEffect(() => {
    dispatch(
      fetchHotelsRequest({
        destinationId,
        priceRange: {
          min: isFinite(priceFrom) ? priceFrom : null,
          max: isFinite(priceTo) ? priceTo : null,
        },
      })
    );
  }, [dispatch, destinationId, priceFrom, priceTo]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (!cityFilter) return true;
      return hotel.city?.toLowerCase().includes(cityFilter.toLowerCase());
    });
  }, [hotels, cityFilter]);

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
              key={hotel.id}
              item
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
        <Box
          mt={4}
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Typography
            variant="h6"
            color="#fff"
            align="center"
            sx={{ textShadow: "1px 1px 3px #ffeb3b" }}
          >
            No hotels found matching your criteria.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ color: "#fff" }}
          >
            Return to Home Page
          </Button>
        </Box>
      )}
    </Box>
  );
}
