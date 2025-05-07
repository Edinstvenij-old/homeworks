import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  // Если данных о гостинице нет, то ничего не рендерим
  if (!hotel) return null;

  // Используем деструктуризацию с дефолтными значениями
  const {
    id,
    name = "Без названия",
    address = "Адрес не указан",
    city = "Город не указан",
    hotel_rating = "N/A",
    phone_number = "N/A",
    image = "/images/default-hotel.jpg", // Установим значение по умолчанию для изображения
  } = hotel;

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, mb: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {city}
        </Typography>
        <Box mt={1}>
          <Typography variant="body2" color="text.secondary">
            Рейтинг: {hotel_rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Телефон: {phone_number}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/hotels/${id}`)}
        >
          Посмотреть подробности
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
