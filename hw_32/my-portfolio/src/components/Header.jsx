import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Box
        sx={{
          boxShadow: trigger ? 4 : 0,
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        {children}
      </Box>
    </Slide>
  );
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              component="img"
              src="/images/logo.jpg"
              alt="Логотип"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography variant="h6" sx={{ color: "white" }}>
              Мой Портфолио
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="end"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openMenu}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Главная
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  to="/todo"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  TODO
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  to="/swapi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  SWAPI
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ color: "white" }}
            >
              Главная
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/todo"
              sx={{ color: "white" }}
            >
              TODO
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/swapi"
              sx={{ color: "white" }}
            >
              SWAPI
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
