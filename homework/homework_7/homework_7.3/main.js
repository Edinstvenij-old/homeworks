function promptForNumber() {
  let input;
  for (let i = 0; i < 10; i++) {
    input = prompt(`Введіть число більше 100 (спроба ${i + 1} з 10):`);

    if (input === null) {
      console.log("Користувач перервав ввід.");
      return;
    }

    // Перевірка, чи введено дійсне число
    if (isNaN(input) || input.trim() === "") {
      alert(`Будь ласка, введіть коректне число. Залишилось спроб: ${9 - i}`);
      continue;
    }

    // Перетворення введеного значення на число
    input = Number(input);

    // Перевірка, чи введено число більше 100
    if (input > 100) {
      console.log(`Введене число: ${input}`);
      return;
    } else {
      alert(
        `Число повинно бути більше 100. Спробуйте ще раз. Залишилось спроб: ${
          9 - i
        }`
      );
    }
  }

  console.log(`Ліміт ітерацій досягнуто. Останнє введення: ${input}`);
}

promptForNumber();
