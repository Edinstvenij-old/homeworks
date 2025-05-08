import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Booking App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Main
        </Button>
        <Button color="inherit" component={RouterLink} to="/about">
          About
        </Button>
        <Button color="inherit" component={RouterLink} to="/hotels">
          Hotels
        </Button>
      </Toolbar>
    </AppBar>
  );
}
