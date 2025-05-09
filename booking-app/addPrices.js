import fs from "fs";

// Загрузка исходных данных
const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
const { hotels, destination } = data;

// Функция генерации случайной цены от 100 до 500, кратной 10
const getRandomPrice = () => {
  return Math.floor(Math.random() * (50 - 10) + 10) * 10; // Генерируем кратные 10 числа
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
