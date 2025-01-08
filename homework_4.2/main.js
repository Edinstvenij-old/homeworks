// Спрашиваем трехзначное число у пользователя
let number = prompt("Введите трехзначное число:");

// Проверяем, введено ли корректное трехзначное число
if (number.length === 3 && !isNaN(number)) {

  // Разделяем цифры числа
  let digit1 = number[0];
  let digit2 = number[1];
  let digit3 = number[2];

  // Проверьте, одинаковы ли цифры
  if (digit1 === digit2 && digit2 === digit3) {
    alert(`Все цифры одинаковы: ${digit1}`);
  } else {
    alert("Не все цифры одинаковы.");
  }

  // Проверка, есть ли среди цифр одинаковые
  if (digit1 === digit2 || digit2 === digit3 || digit1 === digit3) {
    alert("Есть одинаковые цифры.");
  } else {
    alert("Все цифры разные.");
  }
} else {
  alert("Введите трехзначное число.");
}
