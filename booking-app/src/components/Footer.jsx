import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        mt: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Booking App. All rights reserved.
      </Typography>
    </Box>
  );
}
