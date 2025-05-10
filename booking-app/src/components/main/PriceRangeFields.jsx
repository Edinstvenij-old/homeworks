import { Controller } from "react-hook-form";
import { TextField, Box } from "@mui/material";

export default function PriceRangeFields({ control }) {
  return (
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
            helperText={fieldState?.error?.message}
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
            parseFloat(value) >= parseFloat(control._formValues.priceFrom) ||
            "Maximum price must be greater than or equal to minimum",
        }}
        render={({ field, fieldState }) => (
          <TextField
            label="Price To"
            type="number"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState?.error?.message}
            {...field}
          />
        )}
      />
    </Box>
  );
}
