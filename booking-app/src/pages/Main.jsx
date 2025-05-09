import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinationsRequest } from "../store/features/hotels/hotelsSlice";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations, loading, error } = useSelector((state) => state.hotels);
  const { control, handleSubmit, register } = useForm();

  useEffect(() => {
    dispatch(fetchDestinationsRequest());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (!data.destination) return;

    // Формируем параметры для URL
    const params = new URLSearchParams();
    params.append("destinationId", data.destination);

    if (data.city) params.append("city", data.city);
    if (data.checkIn) params.append("checkIn", data.checkIn);
    if (data.checkOut) params.append("checkOut", data.checkOut);
    if (data.guests) params.append("guests", data.guests);
    if (data.priceFrom) params.append("priceFrom", data.priceFrom);
    if (data.priceTo) params.append("priceTo", data.priceTo);

    // Перенаправляем на страницу с результатами
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
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Поле для выбора направления */}
          <Controller
            name="destination"
            control={control}
            defaultValue=""
            rules={{ required: "Destination is required" }}
            render={({ field, fieldState }) => (
              <TextField
                select
                label="Destination"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              >
                {destinations.length > 0 ? (
                  destinations.map((dest) => (
                    <MenuItem key={dest.id} value={dest.id}>
                      {dest.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No destinations found</MenuItem>
                )}
              </TextField>
            )}
          />

          {/* Даты заезда и выезда */}
          <Box display="flex" gap={2}>
            <TextField
              label="Check-in"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("checkIn")}
            />
            <TextField
              label="Check-out"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("checkOut")}
            />
          </Box>

          {/* Количество гостей */}
          <TextField
            label="Guests"
            type="number"
            fullWidth
            {...register("guests")}
          />

          {/* Фильтрация по цене */}
          <Box display="flex" gap={2}>
            <Controller
              name="priceFrom"
              control={control}
              defaultValue=""
              rules={{
                min: {
                  value: 0,
                  message: "Minimum price cannot be negative",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Price From"
                  type="number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="priceTo"
              control={control}
              defaultValue=""
              rules={{
                min: {
                  value: 0,
                  message: "Maximum price cannot be negative",
                },
                validate: (value) =>
                  !value ||
                  !control._formValues.priceFrom ||
                  parseFloat(value) >=
                    parseFloat(control._formValues.priceFrom) ||
                  "Maximum price must be greater than or equal to minimum",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Price To"
                  type="number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Box>

          <Button type="submit" variant="contained" size="large">
            Search Hotels
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
