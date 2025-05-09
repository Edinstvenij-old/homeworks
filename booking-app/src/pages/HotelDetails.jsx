import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Divider,
  Link,
} from "@mui/material";
import { fetchHotelsRequest } from "../features/hotels/hotelsSlice";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotels, loading } = useSelector((state) => state.hotels);
  const hotel = hotels.find((h) => String(h.id) === id);

  useEffect(() => {
    if (!hotels.length) {
      dispatch(fetchHotelsRequest());
    }
  }, [dispatch, hotels.length]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          backgroundColor: "#3f3f3f",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Loading hotel...</Typography>
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          backgroundColor: "#3f3f3f",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Hotel not found
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2, color: "#fff", borderColor: "#fff" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    );
  }

  const fakeReviews = [
    {
      user: "Taras Shevchenko",
      rating: 4.0,
      comment: "Гарний готель, поряд із центром. Персонал чуйний.",
    },
  ];

  const infoStyle = { mb: 1, color: "#212121" };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        backgroundColor: "#3f3f3f",
        width: "100%",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          py: 6,
          px: 2,
          overflowY: "auto",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 800,
            width: "100%",
            borderRadius: 3,
            boxShadow: "0 0 12px rgba(255, 235, 59, 0.3)",
            "&:hover": {
              boxShadow: "0 0 24px rgba(255, 235, 59, 0.7)",
            },
          }}
        >
          <CardMedia
            component="img"
            alt={hotel.name || "Hotel Image"}
            height="300"
            image={hotel.image || "/image/default-image.jpg"}
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />

          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ textAlign: "center", color: "#212121" }}
            >
              {hotel.name || "N/A"}
            </Typography>

            <Box display="flex" justifyContent="center" mb={3}>
              <Chip
                label={`Price per night: $${hotel.price ?? "N/A"}`}
                sx={{
                  fontSize: "1.1rem",
                  p: 2,
                  backgroundColor: "#ffc107",
                  color: "#000",
                }}
              />
            </Box>

            <Typography variant="body1" sx={infoStyle}>
              <strong>Address:</strong> {hotel.address || "N/A"}
            </Typography>
            <Typography variant="body1" sx={infoStyle}>
              <strong>City:</strong> {hotel.city || "N/A"}
            </Typography>
            <Typography variant="body1" sx={infoStyle}>
              <strong>State:</strong> {hotel.state || "N/A"}
            </Typography>
            <Typography variant="body1" sx={infoStyle}>
              <strong>Country:</strong> {hotel.country_code || "N/A"}
            </Typography>
            <Typography variant="body1" sx={infoStyle}>
              <strong>Phone:</strong> {hotel.phone_number || "N/A"}
            </Typography>
            <Typography variant="body1" sx={infoStyle}>
              <strong>Website:</strong>{" "}
              {hotel.website ? (
                <Link
                  href={hotel.website}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  {hotel.website}
                </Link>
              ) : (
                "N/A"
              )}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box textAlign="center" mb={2}>
              <Typography variant="h6" sx={{ color: "#212121" }}>
                User Rating
              </Typography>
              <Rating
                name="read-only-rating"
                value={parseFloat(hotel.hotel_rating) || 0}
                readOnly
                precision={0.5}
                size="large"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Average rating: {hotel.hotel_rating || "N/A"} / 5
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
              Guest Reviews
            </Typography>

            <Box>
              {fakeReviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.user}
                  </Typography>
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ffc107", color: "#000" }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
