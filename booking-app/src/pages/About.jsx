import { Container, Typography, Paper } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About This App
        </Typography>
        <Typography variant="body1">
          This is a modern booking application built with: React 19, Vite, Redux
          Toolkit, Redux-Saga, React Hook Form, Material UI, and json-server.
          You can choose your destination and see the list of available hotels.
        </Typography>
      </Paper>
    </Container>
  );
}
