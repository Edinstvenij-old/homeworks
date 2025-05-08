import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        About This App
      </Typography>
      <Typography>
        This is a simple booking application built with React 19, Vite, Redux
        Toolkit, React-hook-form, MUI, and json-server. It allows users to
        select a destination and view available hotels.
      </Typography>
    </Container>
  );
}
