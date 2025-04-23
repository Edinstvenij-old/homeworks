import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/PersonDetail.css";

const fetchName = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.name || data.title;
};

const PersonDetail = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [homeworld, setHomeworld] = useState("");
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://swapi.py4e.com/api/people/${personId}/`);
      const data = await res.json();
      setPerson(data);

      if (data.homeworld) {
        const name = await fetchName(data.homeworld);
        setHomeworld(name);
      }

      if (data.species.length > 0) {
        const names = await Promise.all(data.species.map(fetchName));
        setSpecies(names);
      }

      if (data.films.length > 0) {
        const names = await Promise.all(data.films.map(fetchName));
        setFilms(names);
      }

      if (data.starships.length > 0) {
        const names = await Promise.all(data.starships.map(fetchName));
        setStarships(names);
      }
    };

    fetchDetails();
  }, [personId]);

  if (!person) {
    return <div className="person-detail-container">Завантаження...</div>;
  }

  return (
    <div className="person-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Назад
      </button>
      <h2>{person.name}</h2>
      <p>Рік народження: {person.birth_year}</p>
      <p>Колір волосся: {person.hair_color}</p>
      <p>Колір шкіри: {person.skin_color}</p>
      <p>Планета: {homeworld || "Невідомо"}</p>
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
