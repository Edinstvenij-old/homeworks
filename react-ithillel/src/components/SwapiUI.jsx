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
      // Для демонстрации создадим статические данные:
      const categoryData = {
        Люди: [
          {
            name: "Люк Скайуокер",
            description:
              "Люк Скайуокер — джедай и один из героев Галактической войны.",
            homePlanet: "Татуин",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "Дарт Вейдер",
            description:
              "Дарт Вейдер, ранее известный как Энакин Скайуокер, был джедаем, который стал ситхом.",
            homePlanet: "Татуин",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "Лея Органа",
            description:
              "Лея Органа — принцесса, лидер Альянса повстанцев, и сестра Люка Скайуокера.",
            homePlanet: "Альдераан",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
        ],
        Планеты: [
          {
            name: "Татуин",
            description:
              "Татуин — пустынная планета в системе Татуин, родина Люка и Энакина Скайуокера.",
            population: "2 миллиона",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "Альдераан",
            description:
              "Альдераан — планета, разрушенная Звездой Смерти в эпизоде IV. Родина принцессы Леи.",
            population: "Гибель населения",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "Хот",
            description:
              "Хот — ледяная планета, известная своей суровой природой, где спрятались повстанцы.",
            population: "3 000",
            firstAppearance:
              "Звездные войны: Эпизод V — Империя наносит ответный удар",
          },
        ],
        Звездолеты: [
          {
            name: "Тысячелетний сокол",
            description:
              "Тысячелетний сокол — корабль Хана Соло, известен своей невероятной скоростью и маневренностью.",
            pilot: "Хан Соло",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "X-wing",
            description:
              "X-wing — тип истребителей, используемых Альянсом повстанцев в борьбе с Империей.",
            pilot: "Люк Скайуокер",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "TIE Fighter",
            description:
              "TIE Fighter — звездолет Империи, известен своими опасными маневрами и вооружением.",
            pilot: "Дарт Вейдер",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
        ],
        Транспорт: [
          {
            name: "Спидер",
            description:
              "Спидер — небольшое транспортное средство для передвижения по поверхности.",
            usedBy: "Повстанцы",
            firstAppearance: "Звездные войны: Эпизод IV — Новая надежда",
          },
          {
            name: "AT-AT",
            description:
              "AT-AT — огромный имперский транспортный робот, использующийся для уничтожения целей на поверхности.",
            usedBy: "Империя",
            firstAppearance:
              "Звездные войны: Эпизод V — Империя наносит ответный удар",
          },
          {
            name: "Гоночный под",
            description:
              "Гоночный под — скоростное транспортное средство, используемое для гонок по пустыне Татуина.",
            usedBy: "Жители Татуина",
            firstAppearance: "Звездные войны: Эпизод I — Скрытая угроза",
          },
        ],
        Расы: [
          {
            name: "Человек",
            description:
              "Человеки — одна из самых распространенных рас в Галактике, обладающая высокоразвитыми технологиями.",
            homePlanet: "Корусант",
          },
          {
            name: "Вуки",
            description:
              "Вуки — могущественная раса, известная своим размером и силой, наиболее известен Чубакка.",
            homePlanet: "Кашиик",
          },
          {
            name: "Родиан",
            description:
              "Родиане — раса, известная своим зелёным цветом кожи и уникальными чертами лица.",
            homePlanet: "Родия",
          },
        ],
        Фильмы: [
          {
            name: "Новая надежда",
            year: "1977",
            description:
              "Первый фильм из серии, который показывает начало приключений Люка Скайуокера и битву против Империи.",
          },
          {
            name: "Империя наносит ответный удар",
            year: "1980",
            description:
              "Сиквел, в котором повстанцы сталкиваются с Империей в суровых условиях на планете Хот.",
          },
          {
            name: "Возвращение джедая",
            year: "1983",
            description:
              "Заключительная часть оригинальной трилогии, в которой Люк Скайуокер противостоит Дарту Вейдеру.",
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
              {categories.map((category, index) => (
                <li
                  key={index}
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
                      categoryDetails.map((item, index) => (
                        <li key={index} className="list-group-item">
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
