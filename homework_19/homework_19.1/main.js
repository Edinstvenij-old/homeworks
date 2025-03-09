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

    const forecast = data.list && data.list.length ? data.list[0] : null;

    if (!forecast || !data.city) {
      throw new Error("Немає доступних прогнозів погоди");
    }

    const { main, wind, weather, dt } = forecast;
    const { name } = data.city;

    const forecastDate = new Date(dt * 1000).toLocaleString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });

    forecastElement.innerHTML = `
      <strong>${name}</strong><br>
      📅 <b>Дата прогнозу:</b> ${forecastDate}<br>
      🌡 <b>Температура:</b> ${main.temp}°C<br>
      🔥 <b>Відчувається як:</b> ${main.feels_like}°C<br>
      💧 <b>Вологість:</b> ${main.humidity}%<br>
      🌤 <b>Опис:</b> ${weather?.[0]?.description || "Немає даних"}<br>
      💨 <b>Вітер:</b> ${wind?.speed || 0} м/с<br>
      🎈 <b>Тиск:</b> ${main.pressure} гПа<br>
      ☀️ <b>Температура на сонці:</b> ${main.temp_max}°C<br>
      <button id="refreshForecast" style="margin-top:10px; padding:5px 10px; cursor:pointer;">
        🔄 Оновити
      </button>
    `;

    const refreshButton = document.getElementById("refreshForecast");
    refreshButton.addEventListener("click", fetchForecast);
  } catch (error) {
    console.error(error);
    forecastElement.innerHTML = `🚨 ${error.message}`;
  } finally {
    clearTimeout(timeoutId);
  }
}

fetchForecast();
