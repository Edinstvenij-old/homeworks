import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/PersonDetail.css";

const fetchName = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Не вдалося завантажити дані");
    const data = await res.json();
    return data.name || data.title;
  } catch (error) {
    console.error("Помилка при завантаженні:", error);
    return "Невідомо";
  }
};

const PersonDetail = () => {
  const { personId } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [homeworld, setHomeworld] = useState("");
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Загружаем данные о персонаже и связях
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true); // Начинаем загрузку
      try {
        const res = await fetch(
          `https://swapi.py4e.com/api/people/${personId}/`
        );
        if (!res.ok) throw new Error("Персонажа не знайдено");
        const data = await res.json();
        setPerson(data);

        // Загружаем дополнительные данные
        const homeworldName = data.homeworld
          ? await fetchName(data.homeworld)
          : "Невідомо";
        setHomeworld(homeworldName);

        const speciesNames =
          data.species.length > 0
            ? await Promise.all(data.species.map(fetchName))
            : [];
        setSpecies(speciesNames);

        const filmsNames =
          data.films.length > 0
            ? await Promise.all(data.films.map(fetchName))
            : [];
        setFilms(filmsNames);

        const starshipsNames =
          data.starships.length > 0
            ? await Promise.all(data.starships.map(fetchName))
            : [];
        setStarships(starshipsNames);
      } catch (err) {
        console.error("Помилка:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchDetails();
  }, [personId]);

  // Если произошла ошибка, отображаем её
  if (error) {
    return (
      <div className="person-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Назад
        </button>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return <div className="person-detail-container">Завантаження...</div>;
  }

  // Если данные успешно загружены, отображаем информацию
  return (
    <div className="person-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Назад
      </button>
      <h2>{person.name}</h2>
      <p>Рік народження: {person.birth_year}</p>
      <p>Колір волосся: {person.hair_color}</p>
      <p>Колір шкіри: {person.skin_color}</p>
      <p>Планета: {homeworld}</p>
      <p>Раса: {species.length ? species.join(", ") : "Невідомо"}</p>

      <div>
        <h3>Фільми:</h3>
        {films.length > 0 ? (
          <ul className="person-detail-list">
            {films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        ) : (
          <p>Немає</p>
        )}
      </div>

      <div>
        <h3>Зіркові кораблі:</h3>
        {starships.length > 0 ? (
          <ul className="person-detail-list">
            {starships.map((ship, index) => (
              <li key={index}>{ship}</li>
            ))}
          </ul>
        ) : (
          <p>Немає</p>
        )}
      </div>
    </div>
  );
};

export default PersonDetail;
