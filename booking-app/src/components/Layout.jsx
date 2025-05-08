import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      width="100%"
      bgcolor="background.default"
    >
      <Box component="header" width="100%" sx={{ flexShrink: 0 }}>
        <Header />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </Box>

      <Box component="footer" width="100%" sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
