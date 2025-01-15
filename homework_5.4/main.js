const num = Number(prompt("Введіть ціле число:"));

if (isNaN(num) || num <= 1 || !Number.isInteger(num)) {
  console.log("Введіть коректне ціле число більше 1.");
} else {
  let example = true;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      example = false;
      break;
    }
  }

  if (example) {
    console.log(`${num} є простим числом.`);
  } else {
    console.log(`${num} не є простим числом.`);
  }
}
