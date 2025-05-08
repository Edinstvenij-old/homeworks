import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go Home
      </Button>
    </Container>
  );
}
