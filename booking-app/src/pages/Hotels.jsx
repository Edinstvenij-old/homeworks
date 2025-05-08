import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function Hotels() {
  const { hotels } = useSelector((state) => state.hotels);

  return (
    <Grid container spacing={2} padding={2}>
      {hotels.map((hotel) => (
        <Grid item xs={12} md={6} key={hotel.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{hotel.name}</Typography>
              <Typography>{hotel.address}</Typography>
              <Typography>Rating: {hotel.hotel_rating}</Typography>
              <Typography>Phone: {hotel.phone_number}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
