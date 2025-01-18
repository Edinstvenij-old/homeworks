function removeCharacters(input, charsToRemove) {
  const charsSet = new Set(charsToRemove);
  return Array.from(input)
    .filter((char) => !charsSet.has(char))
    .join("");
}

const input = prompt("Введіть рядок:");
const charsToRemove = prompt(
  "Введіть символи для видалення, розділені комами:"
).split(",");

const result = removeCharacters(input, charsToRemove);

alert(`Результат: ${result}`);
