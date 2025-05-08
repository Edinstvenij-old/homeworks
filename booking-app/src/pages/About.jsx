import { Typography, Paper, Box } from "@mui/material";

export default function About() {
  return (
    <Box
      component="section"
      py={6}
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Поднять вверх
        backgroundImage: `url('/image/fon-about.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        pt: 10, // Внутренний отступ сверху
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          color: "#fff",
          textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        About This App
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "80%",
          maxWidth: 1200,
          mx: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="body1">
          This is a modern booking application built with React 19, Vite, Redux
          Toolkit, Redux-Saga, React Hook Form, Material UI, and json-server.
          You can choose your destination and see the list of available hotels.
        </Typography>
      </Paper>
    </Box>
  );
}
