import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../redux/peopleSlice";
import { Link } from "react-router-dom";
import "./style/PeopleList.css";

const PeopleList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchPeople(2));
  };

  if (status === "loading") {
    return <div className="loading">Завантаження...</div>;
  }

  if (status === "failed") {
    return <div className="error">Помилка: {error}</div>;
  }

  return (
    <div className="people-list-container">
      <h2>Список персонажів:</h2>
      <div className="people-list">
        {items.map((person) => (
          <div key={person.name} className="person-item">
            <Link
              to={`/person/${person.url.split("/")[5]}`}
              className="person-link"
            >
              {person.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="load-more-container">
        <button
          onClick={handleLoadMore}
          disabled={status === "loading"}
          className="load-more-btn"
        >
          Завантажити
        </button>
      </div>
    </div>
  );
};

export default PeopleList;
