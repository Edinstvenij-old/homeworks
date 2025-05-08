import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDestinationsRequest,
  fetchHotelsRequest,
} from "../features/hotels/hotelsSlice";

export default function Main() {
  const dispatch = useDispatch();
  const { destinations } = useSelector((state) => state.hotels);
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchDestinationsRequest());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(fetchHotelsRequest(data.destination));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <Typography variant="h4">Book a Hotel</Typography>
      <Controller
        name="destination"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            select
            label="Destination"
            fullWidth
            margin="normal"
            {...field}
          >
            {destinations.map((dest) => (
              <MenuItem key={dest.id} value={dest.value}>
                {dest.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
}
