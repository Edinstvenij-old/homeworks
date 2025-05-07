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

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={hotel?.image || "/image/default-image.jpg"} // ✅ safe access
        alt={hotel?.name || "Hotel image"}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {hotel?.name || "No name available"}
        </Typography>

        <Typography color="textSecondary" variant="body2" paragraph>
          {hotel?.address || "No address available"}
        </Typography>

        <Typography color="textSecondary" variant="body2">
          {hotel?.city || "No city specified"}
        </Typography>

        <Typography variant="body2" color="textSecondary" mt={1}>
          Rating: {hotel?.hotel_rating || "N/A"}
        </Typography>

        <Typography variant="body2" color="textSecondary" mt={1}>
          Phone: {hotel?.phone_number || "N/A"}
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/hotel/${hotel?.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
