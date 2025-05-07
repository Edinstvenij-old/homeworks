import { Form, Field } from "react-final-form";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { sendBookingRequest } from "../store/features/booking/bookingSlice";
import { fetchDestinations } from "../api/api";
import { Button, MenuItem, TextField, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDestinations();
        if (Array.isArray(response)) {
          setDestinations(response);
        } else {
          setDestinations([]);
        }
      } catch (err) {
        setError("Failed to load destinations.");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = useCallback(
    (values) => {
      dispatch(sendBookingRequest(values));
    },
    [dispatch]
  );

  return (
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
                label="Destination"
                {...input}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : error ? (
                  <MenuItem disabled>{error}</MenuItem>
                ) : destinations.length > 0 ? (
                  destinations.map((opt) => (
                    <MenuItem key={opt.id} value={opt.label}>
                      {opt.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No destinations available</MenuItem>
                )}
              </TextField>
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            Send
          </Button>
        </form>
      )}
    />
  );
}
