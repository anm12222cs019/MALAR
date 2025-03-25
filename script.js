// Your OpenWeatherMap API Key
const apiKey = "bd5e378503939ddaee76f12ad7a97608";

// DOM Elements
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

// Event Listener for Search Button
searchButton.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Function to Fetch Weather Data
function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then(data => {
      updateUI(data);
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
}

// Function to Update UI
function updateUI(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description } = data.weather[0];

  locationElement.textContent = name;
  temperatureElement.textContent = `${temp}°C`;
  descriptionElement.textContent = description;

  // Update background based on weather condition
  const body = document.body;
  if (description.toLowerCase().includes("sun")) {
    body.className = "sunny";
  } else if (description.toLowerCase().includes("rain")) {
    body.className = "rainy";
  } else if (description.toLowerCase().includes("cloud")) {
    body.className = "cloudy";
  } else {
    body.className = "";
  }
}
