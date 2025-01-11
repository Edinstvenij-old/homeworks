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
  // Конвертация birthYear в число
  const birthYearNum = Number(birthYear);

  // Проверка на корректность числа
  if (isNaN(birthYearNum)) {
    alert(
      "Год рождения должен быть числом. Пожалуйста, проверьте введенные данные."
    );
  } else {
    // Расчет возраста
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYearNum;

    if (age < 0) {
      alert(
        "Вы указали год рождения, который больше текущего. Пожалуйста, проверьте введенные данные."
      );
    } else if (age < 12) {
      alert(
        "Ваш возраст слишком мал (меньше 12 лет). Пожалуйста, проверьте введенные данные."
      );
    } else {
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
        sportMessage = `Круто! Хочешь стать как ${
          sportsChampions[favoriteSport.toLowerCase()]
        }?`;
      } else {
        sportMessage = `Ваш любимый вид спорта: ${favoriteSport}.`;
      }

      // Выводим результаты
      alert(`Ваш возраст: ${age}\n${cityMessage}\n${sportMessage}`);
    }
  }
}
