import { TextField, Box } from "@mui/material";

export default function DateRangeFields({ register, errors }) {
  return (
    <Box display="flex" gap={2}>
      <TextField
        label="Check-in"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        // {...register("checkIn", { required: "Check-in date is required" })}
        {...register("checkIn")}
        error={!!errors.checkIn}
        helperText={errors.checkIn?.message}
      />
      <TextField
        label="Check-out"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        // {...register("checkOut", { required: "Check-out date is required" })}
        {...register("checkOut")}
        error={!!errors.checkOut}
        helperText={errors.checkOut?.message}
      />
    </Box>
  );
}
