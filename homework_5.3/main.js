const N = Number(prompt("Введіть ціле число N:"));

if (isNaN(N) || N < 1) {
  console.log("Введіть коректне додатнє ціле число.");
} else {
  for (let i = 1; i <= 100; i++) {
    if (i * i > N) break;
    console.log(i);
  }
}
