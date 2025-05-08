// components/Layout.jsx
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
