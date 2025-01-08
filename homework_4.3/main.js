// Спрашиваем данные у пользователя
const birthYear = prompt("Укажите ваш год рождения:");
const city = prompt("Укажите город, в котором вы живете:");
const favoriteSport = prompt("Укажите ваш любимый вид спорта:");

// Проверка на введение
let missingInfo = [];
if (!birthYear) missingInfo.push("год рождения");
if (!city) missingInfo.push("город");
if (!favoriteSport) missingInfo.push("вид спорта");

if (missingInfo.length > 0) {
  alert(`Жаль, что Вы не захотели ввести свой ${missingInfo.join(", ")}.`);
} else {
  // Расчет возраста
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  // Формируем сообщение о городе
  let cityMessage;
  switch (city.toLowerCase()) {
    case "киев":
      cityMessage = "Ты живешь в столице Украины.";
      break;
    case "вашингтон":
      cityMessage = "Ты живешь в столице США.";
      break;
    case "лондон":
      cityMessage = "Ты живешь в столице Великобритании.";
      break;
    default:
      cityMessage = `Ты живешь в городе ${city}.`;
  }

  // Чемпионы видов спорта
  const sportsChampions = {
    футбол: "Лионель Месси",
    баскетбол: "Майкл Джордан",
    бокс: "Александр Усик",
  };

  let sportMessage;
  if (favoriteSport.toLowerCase() in sportsChampions) {
    sportMessage = `Круто! Хочеш стать как ${
      sportsChampions[favoriteSport.toLowerCase()]
    }?`;
  } else {
    sportMessage = `Ваш любимый вид спорта: ${favoriteSport}.`;
  }

  // Выводим результаты
  alert(`Ваш возраст: ${age}\n${cityMessage}\n${sportMessage}`);
}
