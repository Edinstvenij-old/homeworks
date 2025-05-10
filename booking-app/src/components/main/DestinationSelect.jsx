import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

export default function DestinationSelect({ control, destinations }) {
  return (
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
          helperText={fieldState?.error?.message}
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
  );
}
