const API_KEY = "8817cffa8b34a381db28aa4b3f7c9b70";
const CITY = "Kyiv";

async function fetchForecast() {
  const forecastElement = document.getElementById("forecast");

  if (!forecastElement) {
    console.error("Помилка: Не знайдено елемент з ID 'forecast'");
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric&lang=ua`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`Помилка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.list || data.list.length === 0 || !data.city) {
      throw new Error("Немає доступних прогнозів погоди");
    }

    const forecast = data.list[0];
    const weather = forecast.weather?.[0]?.description || "Немає даних";
    const forecastDate = new Date(forecast.dt * 1000).toLocaleString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

    forecastElement.innerHTML = `
      <strong>${data.city.name}</strong><br>
      📅 Дата прогнозу: ${forecastDate}<br>
      🌡 Температура: ${forecast.main.temp}°C<br>
      🔥 Відчувається як: ${forecast.main.feels_like}°C<br>
      💧 Вологість: ${forecast.main.humidity}%<br>
      🌤 Опис: ${weather}<br>
      💨 Вітер: ${forecast.wind.speed} м/с<br>
      🎈 Тиск: ${forecast.main.pressure} гПа<br>
      ☀️ Температура на сонці: ${forecast.main.temp_max}°C<br>
      <button id="refreshForecast" style="margin-top:10px; padding:5px 10px; cursor:pointer;">
        🔄 Оновити
      </button>
    `;

    setTimeout(() => {
      const refreshButton = document.getElementById("refreshForecast");
      if (refreshButton) {
        refreshButton.addEventListener("click", fetchForecast);
      }
    }, 0);
  } catch (error) {
    console.error(error);
    forecastElement.innerHTML = `🚨 ${error.message}`;
  } finally {
    clearTimeout(timeoutId);
  }
}

fetchForecast();
