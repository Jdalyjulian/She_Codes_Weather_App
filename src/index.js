function twoDigit(number) {
  return String(number).padStart(2, "0");
}

let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = twoDigit(now.getHours());
let currentMinutes = twoDigit(now.getMinutes());

h3.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

/// Search City
function showSearchWeather(response) {
  let currentTemperature = document.querySelector("#mainTemperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}°C`;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = `Conditions: ${response.data.weather[0].main}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
}

function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchCityInput.value}`;
  let apiSearchKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=metric&appid=${apiSearchKey}`;
  axios.get(apiSearchUrl).then(showSearchWeather);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", searchCity);

///Current Button

function showWeather(response) {
  let currentTemperature = document.querySelector("#mainTemperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}°C`;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = `Conditions: ${response.data.weather[0].main}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentPosition);
