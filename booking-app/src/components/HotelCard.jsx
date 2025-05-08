import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <Card
      elevation={4}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom noWrap>
            {hotel.name || "Unnamed Hotel"}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {hotel.address || "No address available"}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Rating: {hotel.hotel_rating ?? "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {hotel.phone_number ?? "N/A"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
