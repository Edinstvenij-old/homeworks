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

  if (!hotel) return null;

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={hotel.image || "/image/default-image.jpg"}
        alt={hotel.name || "Hotel image"}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {hotel.name || "Без названия"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.address || "Адрес не указан"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.city || "Город не указан"}
        </Typography>
        <Box mt={1}>
          <Typography variant="body2" color="text.secondary">
            Рейтинг: {hotel.hotel_rating ?? "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Телефон: {hotel.phone_number || "N/A"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/hotels/${hotel.id}`)}
        >
          Посмотреть подробности
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
