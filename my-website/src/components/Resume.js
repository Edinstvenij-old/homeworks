import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Resume() {
  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4">Моє резюме</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Привіт! Я розробник з досвідом роботи з React, Node.js і Redux. Моя
          спеціалізація - створення інтерактивних веб-додатків.
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Навички:</Typography>
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>Redux</li>
            <li>JavaScript, TypeScript</li>
          </ul>
        </Box>
      </Box>
    </Container>
  );
}

export default Resume;
