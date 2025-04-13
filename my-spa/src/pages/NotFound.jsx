import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Сторінка не знайдена</h1>
      <p>Вибачте, ми не можемо знайти цю сторінку.</p>
      <Link to="/" className="btn-home">
        Повернутися на головну
      </Link>
    </div>
  );
}

export default NotFound;
