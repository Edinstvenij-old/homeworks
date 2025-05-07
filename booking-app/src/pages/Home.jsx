import { Form, Field } from "react-final-form";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { sendBooking } from "../store/features/booking/bookingSlice";
import { fetchDestinations } from "../api/api";
import {
  Button,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Загрузка списка городов
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchDestinations();
        if (Array.isArray(response)) {
          setDestinations(response);
        } else {
          throw new Error("Invalid response");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load destinations.");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Обработчик отправки формы
  const onSubmit = useCallback(
    async (values) => {
      const result = await dispatch(sendBooking(values));

      if (sendBooking.fulfilled.match(result)) {
        // Переход на страницу отелей с передачей города через state
        navigate("/hotels", { state: { destination: values.destination } });
      } else {
        alert(result.payload || "Booking error");
      }
    },
    [dispatch, navigate]
  );

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="destination"
              validate={(v) => (v ? undefined : "Required")}
            >
              {({ input, meta }) => (
                <TextField
                  select
                  label="Выберите город"
                  {...input}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                  fullWidth
                  disabled={loading || destinations.length === 0}
                >
                  {loading ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : error ? (
                    <MenuItem disabled>{error}</MenuItem>
                  ) : (
                    destinations.map((opt) => (
                      <MenuItem key={opt.id} value={opt.label}>
                        {opt.label}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            </Field>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading || destinations.length === 0}
            >
              Отправить
            </Button>
          </form>
        )}
      />
    </Box>
  );
}
