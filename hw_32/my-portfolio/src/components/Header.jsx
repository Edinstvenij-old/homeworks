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
import { NavLink } from "react-router-dom";
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
              Portfolio
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
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#64b5f6" : "#fff",
                    backgroundColor: isActive
                      ? "rgba(100, 181, 246, 0.1)"
                      : "transparent",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  })}
                >
                  Главная
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/todo"
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#64b5f6" : "#fff",
                    backgroundColor: isActive
                      ? "rgba(100, 181, 246, 0.1)"
                      : "transparent",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  })}
                >
                  TODO
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/swapi"
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#64b5f6" : "#fff",
                    backgroundColor: isActive
                      ? "rgba(100, 181, 246, 0.1)"
                      : "transparent",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  })}
                >
                  SWAPI
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              color="inherit"
              component={NavLink}
              to="/"
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                "&.active": {
                  color: "#64b5f6",
                  backgroundColor: "rgba(100, 181, 246, 0.1)",
                },
                "&:hover": {
                  backgroundColor: "rgba(100, 181, 246, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Главная
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/todo"
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                "&.active": {
                  color: "#64b5f6",
                  backgroundColor: "rgba(100, 181, 246, 0.1)",
                },
                "&:hover": {
                  backgroundColor: "rgba(100, 181, 246, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              TODO
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/swapi"
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                "&.active": {
                  color: "#64b5f6",
                  backgroundColor: "rgba(100, 181, 246, 0.1)",
                },
                "&:hover": {
                  backgroundColor: "rgba(100, 181, 246, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
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
