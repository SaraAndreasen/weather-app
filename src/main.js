let apiKey = "c3tf38bfdaaca9c9406e786o84b5cbf8";

// API response
function displayCityAndTemp(response) {
  let cityName = document.querySelector("#city-name");
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  let currentTimeElement = document.querySelector("#date");
  let weatherConditionsElement = document.querySelector("#weather-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  let currentTemp = Math.round(response.data.temperature.current);
  let cityFromResponse = response.data.city;
  let weatherConditionsFromCity = response.data.condition.description;
  let date = new Date(response.data.time * 1000);
  let currentLocalHumidity = response.data.temperature.humidity;
  let currentWindSpeed = response.data.wind.speed;

  weatherConditionsElement.innerHTML = `${weatherConditionsFromCity}`;
  currentTemperatureElement.innerHTML = `${currentTemp}`;
  cityName.innerHTML = `${cityFromResponse}`;
  humidityElement.innerHTML = `${currentLocalHumidity}%`;
  windElement.innerHTML = `${currentWindSpeed} km/h`;
  currentTimeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;

  getForecast(response.data.city);
}

// Format date for daily overview
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = weekDays[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Format day for weather forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let weatherApi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(weatherApi).then(displayCityAndTemp);
}

function handleSearchSubmit(event) {
  let cityInput = document.querySelector("#search-input-city");
  event.preventDefault();

  searchCity(cityInput.value);
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log("test", response.data.daily);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
            <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div class="weather-forecast-icon">
              <img src="${day.condition.icon_url}" alt="${
          day.condition.description
        }" class="weather-emoji" />
              </div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(day.temperature.maximum)}°C</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}°C</div>
              </div>
            </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchedCityForm = document.querySelector("#search-city-form");
searchedCityForm.addEventListener("submit", handleSearchSubmit);

searchCity("Copenhagen");
