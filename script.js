// --- Dark/Light Mode with Persistence ---
const sunBtn = document.getElementById("dark-light-sun");
const moonBtn = document.getElementById("dark-light-moon");
const body = document.body;
const header = document.querySelector("header");
const main = document.querySelector("main");

// Apply saved theme or default = dark
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  enableLightMode();
} else {
  enableDarkMode();
}

function enableLightMode() {
  body.classList.remove("dark-mode");
  header.classList.remove("dark-mode");
  main.classList.remove("dark-mode");

  body.classList.add("light-mode");
  header.classList.add("light-mode");
  main.classList.add("light-mode");

  localStorage.setItem("theme", "light");
}

function enableDarkMode() {
  body.classList.remove("light-mode");
  header.classList.remove("light-mode");
  main.classList.remove("light-mode");

  body.classList.add("dark-mode");
  header.classList.add("dark-mode");
  main.classList.add("dark-mode");

  localStorage.setItem("theme", "dark");
}

// Light mode toggle
sunBtn.addEventListener("click", enableLightMode);

// Dark mode toggle
moonBtn.addEventListener("click", enableDarkMode);


// --- Date / Time ---
const timeel = document.getElementById("date-element");
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function updateDate() {
  const time = new Date();
  timeel.innerHTML = `${days[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}`;
}
updateDate();
setInterval(updateDate, 1000);

// --- GitHub Link ---
const git = document.getElementById("git-hub");
git.addEventListener('click', () => {
  window.open("https://github.com/jafferafzalkhan", "_blank");
});

// --- Weather API ---
const API_KEY = "2fc019d0062d1257128e0f126bba859e";

// DOM Elements
const forecastContainer = document.getElementById("forecast-cards");
const forecast5DayContainer = document.getElementById("forecast-5day-cards");
const locationEl = document.getElementById("location");
const tempEl = document.getElementById("temperature");
const tempel = document.getElementById("tempera");
const conditionEl = document.getElementById("condition");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const pressureEl = document.getElementById("pressure");
const windSpeedEl = document.getElementById("wind-speed");
const windSpeedel = document.getElementById("wind-speeds");
const visibilityEl = document.getElementById("visibility");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const weatherIconEl = document.getElementById("weather-icon");

// Format timestamp → hh:mm
function formatTime(dt) {
  return new Date(dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// --- Fetch Current + Today’s Forecast ---
function getCityForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      const current = data.list[0];
      locationEl.textContent = `${data.city.name}, ${data.city.country}`;
      tempEl.textContent = `${Math.round(current.main.temp)}°C`;
      tempel.textContent = `${Math.round(current.main.temp)}°C`;
      conditionEl.textContent = current.weather[0].description;
      feelsLikeEl.textContent = `Feels like ${Math.round(current.main.feels_like)}°C`;
      humidityEl.textContent = `${current.main.humidity}%`;
      pressureEl.textContent = `${current.main.pressure} hPa`;
      windSpeedEl.textContent = `${current.wind.speed} m/s`;
      windSpeedel.textContent = `${current.wind.speed} m/s`;
      visibilityEl.textContent = `${(current.visibility/1000).toFixed(1)} km`;
      sunriseEl.textContent = formatTime(data.city.sunrise);
      sunsetEl.textContent = formatTime(data.city.sunset);

      // Weather Icon - Main
      const mainWeather = current.weather[0].main.toLowerCase(); 
      let weatherClass = '';
      if (mainWeather.includes("cloud")) weatherClass = "cloudy";
      else if (mainWeather.includes("clear")) weatherClass = "sunny";
      else if (mainWeather.includes("rain")) weatherClass = "rainy";
      else if (mainWeather.includes("snow")) weatherClass = "snowy";

      weatherIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" class="weather-icon ${weatherClass}">`;

      // Today’s Forecast (5 slots)
      forecastContainer.innerHTML = "";
      data.list.slice(0, 5).forEach((item) => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const mainItem = item.weather[0].main.toLowerCase();
        let forecastClass = '';
        if (mainItem.includes("cloud")) forecastClass = "cloudy";
        else if (mainItem.includes("clear")) forecastClass = "sunny";
        else if (mainItem.includes("rain")) forecastClass = "rainy";
        else if (mainItem.includes("snow")) forecastClass = "snowy";

        forecastContainer.innerHTML += `
          <div class="bg-neutral-800 border-2 border-gray-300 rounded-xl p-4 w-32 sm:w-40 text-center">
            <p class="text-sm text-gray-400">${time}</p>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="mx-auto weather-icon ${forecastClass}"/>
            <p class="text-sm">${item.weather[0].description}</p>
            <p class="font-bold">${Math.round(item.main.temp)}°C</p>
          </div>`;
      });

      // 5-Day Forecast
      getFiveDayForecast(city);
    })
    .catch((err) => console.error("Error:", err));
}

// --- Fetch 5-Day Forecast ---
function getFiveDayForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      forecast5DayContainer.innerHTML = "";
      const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);

      daily.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const mainDay = day.weather[0].main.toLowerCase();
        let forecastClass = '';
        if (mainDay.includes("cloud")) forecastClass = "cloudy";
        else if (mainDay.includes("clear")) forecastClass = "sunny";
        else if (mainDay.includes("rain")) forecastClass = "rainy";
        else if (mainDay.includes("snow")) forecastClass = "snowy";

        forecast5DayContainer.innerHTML += `
          <div class="bg-neutral-800 border-2 border-gray-300 rounded-xl p-4 w-32 sm:w-40 text-center">
            <p class="text-sm text-gray-400">${date.toLocaleDateString("en-US",{weekday:"short"})}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" class="mx-auto weather-icon ${forecastClass}"/>
            <p class="text-sm">${day.weather[0].description}</p>
            <p class="font-bold">${Math.round(day.main.temp)}°C</p>
          </div>`;
      });
    })
    .catch((err) => console.error("5-day forecast error:", err));
}

// --- Search ---
function capitalizeWords(str) {
  return str.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

const searchBox = document.getElementById("search-weather");
const searchLocation = document.getElementById("search-location");

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const input = searchBox.value.trim();

    if (!input) {
     alert('please enter country or city name');
      return;
    }

    const formattedCity = capitalizeWords(input);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error("Invalid city or country");
        return res.json();
      })
      .then(data => {
        searchLocation.textContent = `${data.name}, ${data.sys.country}`;
        getCityForecast(formattedCity);
        searchBox.value = "";
      })
      .catch(() => {
        window.location.href = `redirect.html?msg=City or Country "${formattedCity}" not found`;
      });
  }
});




// --- Default City ---
getCityForecast("Mumbai");
