import fs from "fs";

// Загрузка исходных данных
const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
const { hotels, destination } = data;

// Функция генерации случайной цены с двумя знаками после запятой от 100 до 500
const getRandomPrice = () => {
  return parseFloat((Math.random() * (500 - 100) + 100).toFixed(2));
};

// Добавим цену каждому отелю
const hotelsWithPrice = hotels.map((hotel) => ({
  ...hotel,
  price: getRandomPrice(),
}));

// Сохраняем обновлённые данные в db.json
fs.writeFileSync(
  "db.json",
  JSON.stringify({ destination, hotels: hotelsWithPrice }, null, 2)
);

console.log("✅ Цены успешно добавлены каждому отелю и сохранены в db.json");
