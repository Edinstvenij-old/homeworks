import { Typography, Paper, Box } from "@mui/material";

export default function About() {
  return (
    <Box
      component="section"
      py={6}
      sx={{
        width: "100vh",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        About This App
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
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
