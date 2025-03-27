let timeLeft = 85;
let timerInterval;

// Функция для форматирования времени в MM:SS
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

// Функция для обновления таймера
function updateTimer() {
  document.getElementById("timer").textContent = formatTime(timeLeft);

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("startButton").textContent =
      "Таймер завершено. Перезапустити?";
    document.getElementById("startButton").disabled = false;
  } else {
    timeLeft--;
  }
}

// Запуск или перезапуск таймера
document.getElementById("startButton").addEventListener("click", function () {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  timeLeft = 85;
  document.getElementById("timer").textContent = formatTime(timeLeft);
  this.textContent = "Запустити таймер";
  this.disabled = true;

  timerInterval = setInterval(updateTimer, 1000);
});
