import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Header() {
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    marginLeft: 2,
    "&.active": {
      textDecoration: "underline",
      fontWeight: "bold",
    },
  };

  return (
    <Box component="header" sx={{ width: "100%", margin: 0 }}>
      <AppBar position="static" sx={{ width: "100%", borderRadius: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Booking App
          </Typography>
          <Button component={NavLink} to="/" sx={linkStyle}>
            Main
          </Button>
          <Button component={NavLink} to="/about" sx={linkStyle}>
            About
          </Button>
          <Button component={NavLink} to="/hotels" sx={linkStyle}>
            Hotels
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
