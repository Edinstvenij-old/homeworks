import { TextField } from "@mui/material";

export default function GuestField({ register, errors }) {
  return (
    <TextField
      label="Guests"
      type="number"
      fullWidth
      // {...register("guests", { required: "Number of guests is required" })}
      {...register("guests")}
      error={!!errors.guests}
      helperText={errors.guests?.message}
    />
  );
}
