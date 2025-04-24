import React from "react";

const PersonCard = ({ person, details }) => {
  const getDetailValue = (value) => (value ? value : "Не указано");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">{person.name}</h2>

      <div className="space-y-1 text-gray-700 text-base">
        <p>
          <strong>Рост:</strong> {getDetailValue(person.height)} см
        </p>
        <p>
          <strong>Масса:</strong> {getDetailValue(person.mass)} кг
        </p>
        <p>
          <strong>Цвет волос:</strong> {getDetailValue(person.hair_color)}
        </p>
        <p>
          <strong>Цвет кожи:</strong> {getDetailValue(person.skin_color)}
        </p>
        <p>
          <strong>Цвет глаз:</strong> {getDetailValue(person.eye_color)}
        </p>
        <p>
          <strong>Год рождения:</strong> {getDetailValue(person.birth_year)}
        </p>
        <p>
          <strong>Пол:</strong> {getDetailValue(person.gender)}
        </p>
      </div>

      {details ? (
        <div className="pt-4 border-t space-y-2">
          <p>
            <strong>Родная планета:</strong> {getDetailValue(details.homeworld)}
          </p>
          <div>
            <strong>Фильмы:</strong>
            {details.films.length ? (
              <ul className="list-disc list-inside pl-4 mt-1">
                {details.films.map((film, index) => (
                  <li key={index}>{film}</li>
                ))}
              </ul>
            ) : (
              <p>Информация о фильмах не доступна.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="italic text-gray-500">Загрузка подробной информации...</p>
      )}
    </div>
  );
};

export default PersonCard;
