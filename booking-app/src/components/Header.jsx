import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/hotels">
          Hotels
        </Button>
      </Toolbar>
    </AppBar>
  );
}
