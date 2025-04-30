import React from "react";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/todo">
            Todo
          </Button>
          <Button color="inherit" component={Link} to="/swapi">
            SWAPI
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
