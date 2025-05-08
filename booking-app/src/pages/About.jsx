import { Typography, Paper, Box } from "@mui/material";

export default function About() {
  return (
    <Box
      component="section"
      py={6}
      sx={{
        width: "100vw",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        About This App
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "60%",
          maxWidth: 1200,
          mx: 2,
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
