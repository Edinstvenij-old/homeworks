import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../redux/peopleSlice";
import { Link } from "react-router-dom";
import "./style/PeopleList.css";

const PeopleList = () => {
  const dispatch = useDispatch();
  const { items, status, error, currentPage, totalCount, next } = useSelector(
    (state) => state.people
  );

  const handleLoadMore = () => {
    dispatch(fetchPeople(currentPage + 1));
  };

  const totalPages = totalCount ? Math.ceil(totalCount / 10) : "?";
  const isFirstLoad = items.length === 0;

  return (
    <div className="people-list-container">
      <h2>Список персонажів:</h2>

      {status === "failed" && <div className="error">Помилка: {error}</div>}
      {isFirstLoad && (
        <div className="empty-message">
          <span role="img" aria-label="robot" className="empty-icon">
            🤖
          </span>
          Натисніть кнопку, щоб завантажити персонажів
        </div>
      )}

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
        {next && (
          <button
            onClick={handleLoadMore}
            disabled={status === "loading"}
            className="load-more-btn"
          >
            {status === "loading"
              ? "Завантаження..."
              : isFirstLoad
              ? "Завантажити персонажів"
              : "Завантажити ще"}
          </button>
        )}
        {currentPage > 0 && (
          <p className="page-info">
            Сторінка: {currentPage} / {totalPages}
          </p>
        )}
      </div>
    </div>
  );
};

export default PeopleList;
