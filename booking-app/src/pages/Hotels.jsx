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
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          color: "#ffeb3b",
          textShadow: "3px 3px 1px rgba(0,0,0,0.8)",
        }}
      >
        Available Hotels
      </Typography>

      {hotels.length > 0 ? (
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
          }}
        >
          {hotels.map((hotel) => (
            <Grid
              key={hotel.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
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
