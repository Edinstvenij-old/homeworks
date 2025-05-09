import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        textAlign: "center",
        backgroundColor: "#1976d2",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="white">
        &copy; {new Date().getFullYear()} Booking App. All rights reserved.
      </Typography>
    </Box>
  );
}
