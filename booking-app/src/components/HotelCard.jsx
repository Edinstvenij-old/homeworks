import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const defaultImage = "..//../public/image/default-image.jpg";

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: 320,
          height: 420,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "#1e1e1e",
          color: "#fff",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={hotel.image || defaultImage}
          alt={hotel.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" color="white">
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="gray">
            {hotel.description || "No description available."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            component={Link}
            to={`/hotels/${hotel.id}`}
            variant="outlined"
            sx={{
              borderColor: "#fff",
              color: "#fff",
              "&:hover": { borderColor: "#ccc" },
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
