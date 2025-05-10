import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinationsRequest } from "../store/features/hotels/hotelsSlice";
import { useNavigate } from "react-router-dom";
import DestinationSelect from "../components/main/DestinationSelect";
import DateRangeFields from "../components/main/DateRangeFields";
import GuestField from "../components/main/GuestField";
import PriceRangeFields from "../components/main/PriceRangeFields";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations, loading, error } = useSelector((state) => state.hotels);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    dispatch(fetchDestinationsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (destinations?.length > 0) {
      setValue("destination", destinations[0].id);
    }
  }, [destinations, setValue]);

  const onSubmit = (data) => {
    if (!data.destination) return;

    const params = new URLSearchParams();
    params.append("destinationId", data.destination);
    if (data.checkIn) params.append("checkIn", data.checkIn);
    if (data.checkOut) params.append("checkOut", data.checkOut);
    if (data.guests) params.append("guests", data.guests);
    if (data.priceFrom) params.append("priceFrom", data.priceFrom);
    if (data.priceTo) params.append("priceTo", data.priceTo);

    navigate(`/hotels?${params.toString()}`);
  };

  if (loading) {
    return (
      <Box
        py={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
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
    <Box
      component="section"
      py={6}
      sx={{
        width: "100vw",
        minHeight: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url('/image/fon-mail.avif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: "#fff", textShadow: "3px 3px 2px rgba(0,0,0,0.7)" }}
      >
        Book a Hotel
      </Typography>

      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 600,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DestinationSelect control={control} destinations={destinations} />
          <DateRangeFields register={register} errors={errors} />
          <GuestField register={register} errors={errors} />
          <PriceRangeFields control={control} errors={errors} watch={watch} />
          <Button type="submit" variant="contained" size="large">
            Search Hotels
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
