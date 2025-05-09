import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Rating, // Добавить импорт Rating
} from "@mui/material";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const defaultImage = "/image/default-image.jpg";

  return (
    <Card
      sx={{
        width: 420,
        height: 490,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(255, 255, 0, 0.2)",
        bgcolor: "grey.900",
        color: "grey.100",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(255, 255, 0, 0.8)",
        },
      }}
    >
      <Box
        sx={{
          height: 180,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={hotel.image || defaultImage}
          alt={hotel.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "grey.100",
          }}
        >
          {hotel.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "grey.300",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            mt: 1,
          }}
        >
          {hotel.description && hotel.description.trim() !== ""
            ? hotel.description
            : "No description available"}
        </Typography>

        <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
          {hotel.address
            ? `Address: ${hotel.address}`
            : "Address: Not available"}
        </Typography>

        <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
          {hotel.city ? `City: ${hotel.city}` : "City: Not available"}
        </Typography>

        {/* Добавляем компонент Rating для отображения звезд */}
        <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
          {hotel.hotel_rating ? (
            <>
              <Rating
                value={parseFloat(hotel.hotel_rating) || 0}
                readOnly
                precision={0.5}
                size="small"
              />
              <span>{hotel.hotel_rating}</span> {/* Показываем рейтинг */}
            </>
          ) : (
            "Rating: Not available"
          )}
        </Typography>

        <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
          {hotel.phone_number
            ? `Phone: ${hotel.phone_number}`
            : "Phone: Not available"}
        </Typography>

        {/* Цена */}
        <Typography
          variant="body1"
          color="warning.main"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          {hotel.price ? `Price: $${hotel.price}` : "Price: Not available"}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          size="small"
          component={Link}
          to={`/hotels/${hotel.id}`}
          variant="outlined"
          sx={{
            borderColor: "grey.100",
            color: "grey.100",
            "&:hover": {
              borderColor: "grey.300",
              backgroundColor: "grey.800",
            },
            "&.Mui-focusVisible": {
              outline: "2px solid #fff",
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
