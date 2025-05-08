import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        mt: 4,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Booking App. All rights reserved.
      </Typography>
    </Box>
  );
}
