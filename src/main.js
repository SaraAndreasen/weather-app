let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = document.querySelector("#date");
let date = new Date();

let apiKey = "c3tf38bfdaaca9c9406e786o84b5cbf8";

let weekDay = weekDays[date.getDay()];
let currentHour = date.getHours();
let currentMinute = date.getMinutes();

currentTime.innerHTML = `${weekDay} ${currentHour}:${currentMinute}`;

// Display searched city
function capitalizeCityName(city) {
  return city.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
let cityInput = document.querySelector("#input-city");
let cityName = document.querySelector("#city-name");
let currentTempHeading = document.querySelector("#current-temperature");

// API response
function displayCityAndTemp(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let cityFromResponse = response.data.city;
  currentTempHeading.innerHTML = `${currentTemp}`;
  cityName.innerHTML = `${cityFromResponse}`;
}

function searchCity(event) {
  event.preventDefault();
  let formattedCity = capitalizeCityName(cityInput.value.trim());
  let weatherApi = `https://api.shecodes.io/weather/v1/current?query=${formattedCity}&key=${apiKey}&units=metric`;

  axios.get(weatherApi).then(displayCityAndTemp);
}

let searchedCityForm = document.querySelector("#search-city-form");
searchedCityForm.addEventListener("submit", searchCity);