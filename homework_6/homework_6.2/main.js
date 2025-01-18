function calculateAverage(arr) {
  // Фільтруємо лише числові елементи
  const numbers = arr.filter((item) => typeof item === "number");

  if (numbers.length === 0) {
    return null;
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

const mixedArray = [1, "hello", true, 42, null, 3.5, "world"];
const average = calculateAverage(mixedArray);
console.log(average);
