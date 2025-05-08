import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%", // Убираем ограничения по ширине
        py: 2,
        px: 3,
        textAlign: "center",
        backgroundColor: "#1976d2", // Цвет, как у хедера (можно использовать тот же, что в AppBar)
        borderTop: "1px solid #ddd",
        mt: "auto", // Это помогает футеру быть внизу страницы
      }}
    >
      <Typography variant="body2" color="white">
        &copy; {new Date().getFullYear()} Booking App. All rights reserved.
      </Typography>
    </Box>
  );
}
