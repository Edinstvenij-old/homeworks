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
import { fetchDestinationsRequest } from "../features/hotels/hotelsSlice";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations, loading, error } = useSelector((state) => state.hotels);
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchDestinationsRequest());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (!data.destination) return;
    navigate(`/hotels?destinationId=${data.destination}`);
  };

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
    <Box component="section" py={6} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom align="center">
          Book a Hotel
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
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
          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            Search Hotels
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
