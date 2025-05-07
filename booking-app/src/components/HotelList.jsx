import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchHotels } from "../store/features/hotels/hotelsSlice";
import HotelCard from "./HotelCard";
import { Typography, Grid, Box, CircularProgress, Alert } from "@mui/material";
import {
  makeSelectHotelsByCity,
  selectLoading,
  selectError,
} from "../store/selectors/hotelsSelectors";

const HotelList = ({ selectedCity: propCity }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Если город передан как пропс, используем его. Иначе, ищем в location.
  const selectedCity = propCity || location.state?.destination || null;

  // Используем селектор для получения отелей, если город выбран
  const hotels = useSelector((state) =>
    makeSelectHotelsByCity()(state, selectedCity)
  );
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Запрос отелей при изменении selectedCity
  useEffect(() => {
    if (selectedCity) {
      console.log("Fetching hotels for city:", selectedCity);
      dispatch(fetchHotels(selectedCity)); // Передаем строку города, а не объект
    } else {
      dispatch(fetchHotels()); // Загружаем все отели, если город не выбран
    }
  }, [dispatch, selectedCity]);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Отели в {selectedCity || "всех направлениях"}
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && hotels?.length === 0 && (
        <Typography>
          Отели не найдены{" "}
          {selectedCity ? `в ${selectedCity}` : "в этой области"}.
        </Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {hotels?.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <HotelCard hotel={hotel} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HotelList;
