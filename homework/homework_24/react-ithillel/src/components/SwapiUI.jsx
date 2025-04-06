import React, { useState, useEffect } from "react";
import "../styles.css";

const SwapiUI = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);

  const categories = [
    "Люди",
    "Планеты",
    "Звездолеты",
    "Транспорт",
    "Расы",
    "Фильмы",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory) {
      const categoryData = {
        Люди: [
          {
            id: 1,
            name: "Люк Скайуокер",
            description:
              "Люк Скайуокер — джедай и один из героев Галактической войны.",
            homePlanet: "Татуин",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            id: 2,
            name: "Дарт Вейдер",
            description:
              "Дарт Вейдер, ранее известный как Энакин Скайуокер, был джедаем, который стал ситхом.",
            homePlanet: "Татуин",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            id: 3,
            name: "Лея Органа",
            description:
              "Лея Органа — принцесса, лидер Альянса повстанцев, и сестра Люка Скайуокера.",
            homePlanet: "Альдераан",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
        ],
        Планеты: [
          {
            id: 4,
            name: "Татуин",
            description:
              "Татуин — пустынная планета в системе Татуин, родина Люка и Энакина Скайуокера.",
            population: "2 миллиона",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            id: 5,
            name: "Альдераан",
            description:
              "Альдераан — планета, разрушенная Звездой Смерти в эпизоде IV. Родина принцессы Леи.",
            population: "Гибель населения",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            id: 6,
            name: "Хот",
            description:
              "Хот — ледяная планета, известная своей суровой природой, где спрятались повстанцы.",
            population: "3 000",
            firstAppearance:
              "Звездные войны: Эпизод V — Империя наносит ответный удар",
          },
        ],
      };

      setCategoryDetails(categoryData[selectedCategory]);
    }
  }, [selectedCategory]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary fw-bold">SWAPI Interface</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white fw-bold text-center">
              Категории
            </div>
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li
                  key={category}
                  className="list-group-item list-group-item-action text-center"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white fw-bold text-center">
              Подробности
            </div>
            <div className="card-body text-center">
              {selectedCategory ? (
                <>
                  <h4>{selectedCategory}</h4>
                  <ul className="list-group">
                    {categoryDetails ? (
                      categoryDetails.map((item) => (
                        <li key={item.id} className="list-group-item">
                          <h5>{item.name || item.title}</h5>
                          <p>{item.description || item.year}</p>
                          <p>
                            {item.firstAppearance &&
                              `Первое появление: ${item.firstAppearance}`}
                          </p>
                          <p>
                            {item.homePlanet &&
                              `Домашняя планета: ${item.homePlanet}`}
                          </p>
                        </li>
                      ))
                    ) : (
                      <p className="text-muted">Загрузка деталей...</p>
                    )}
                  </ul>
                </>
              ) : (
                <p className="text-muted">
                  Выберите категорию для просмотра подробностей.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapiUI;
