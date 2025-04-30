import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { request } from "graphql-request";

// Использование другого прокси-сервиса, например, CORS Anywhere или AllOrigins
const SWAPI_GRAPHQL_URL =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent(
    "https://swapi-graphql.netlify.app/.netlify/functions/index"
  );

function SWAPI() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query {
          allPeople {
            people {
              name
            }
          }
        }
      `;
      try {
        // Ожидаем результат запроса к GraphQL через прокси
        const response = await request(SWAPI_GRAPHQL_URL, query);

        // Логируем весь ответ от сервера для отладки
        console.log("Ответ от сервера:", response);

        // Убедитесь, что получили корректный ответ
        if (response && response.allPeople && response.allPeople.people) {
          setPeople(response.allPeople.people);
        } else {
          throw new Error("Не удалось загрузить данные людей.");
        }

        setLoading(false);
      } catch (err) {
        // Логируем ошибку для отладки и показываем пользователю
        console.error("GraphQL запрос не удался: ", err);
        setError(err.message || "Ошибка при загрузке данных");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Хук useEffect с пустым массивом зависимостей для загрузки данных один раз

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography color="error">
            Ошибка при загрузке данных: {error}
          </Typography>
        </Box>
      ) : people.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography>Нет данных для отображения.</Typography>
        </Box>
      ) : (
        <List>
          {people.map((person, index) => (
            <ListItem key={index}>
              <ListItemText primary={person.name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default SWAPI;
