import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { getPeople } from "../api/swapi";

const Swapi = () => {
  const [people, setPeople] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://swapi.py4e.com/api/people/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPeople = async () => {
    if (!nextUrl || loading) return;

    setLoading(true);
    setError(null);

    try {
      const { results, next } = await getPeople(nextUrl);
      setPeople((prev) => [...prev, ...results]);
      setNextUrl(next);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      setError("Не удалось загрузить данные. Пожалуйста, попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        p: 3,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        backdropFilter: "blur(5px)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "white", fontWeight: "bold" }}
      >
        Знайомі з SWAPI
      </Typography>

      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {people.map((person, idx) => (
          <Grid key={idx} sx={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255,255,255,0.8)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{person.name}</Typography>
                <Typography color="text.secondary">
                  Стать: {person.gender}
                </Typography>
                <Typography color="text.secondary">
                  Рік народження: {person.birth_year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {nextUrl && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={fetchPeople}
            disabled={loading}
            sx={{ fontWeight: "bold" }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Завантажити ще"
            )}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Swapi;
