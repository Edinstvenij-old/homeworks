const input = prompt("Введіть ціле число :");
if (input === null) {
  console.log("Ввід скасовано користувачем.");
} else {
  const square = Number(input);
  if (isNaN(square) || square < 1) {
    console.log("Введіть коректне додатнє ціле число.");
  } else {
    for (let i = 1; i <= 100; i++) {
      if (i * i > square) break;
      console.log(i);
    }
  }
}
