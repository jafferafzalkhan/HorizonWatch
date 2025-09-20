# HorizonWatch
Horizon Watch 🌤️ – A modern weather web app providing real-time forecasts, 5-day outlook, temperature, humidity, wind speed, and feels-like details. Features include location-based updates, city search, and dark/light mode with a clean, responsive UI
HorizonWatch
## Live Demo
🌐horizonwatchweather.netlify.app
A modern weather web app that provides:

Real-time weather forecasts

5-day outlooks

Temperature, humidity, wind speed, and “feels like” details

Location-based updates

City search

Dark / Light mode

Clean, responsive UI

Table of Contents

Features

Tech Stack

Prerequisites

Getting Started

Cloning the Repo

API Key Setup

Installing Dependencies

Configuring Tailwind CSS

Running the App Locally

Project Structure

How It Works / Important Code Paths

Deployment

Troubleshooting

Contributing

License

Features

Current weather details: temperature, humidity, wind speed, feels-like

5-day forecast outlook

Location detection (via browser geolocation)

City search to fetch weather of arbitrary cities

Toggle between light mode and dark mode

Responsive design (works on mobile, tablet, desktop)

Tech Stack

HTML, CSS, JavaScript

Tailwind CSS for styling

Fetch API (or any HTTP client) to get data from a weather API (e.g. OpenWeatherMap)

(Optional) LocalStorage or Cookies for persisting theme choice (dark/light)

Prerequisites

Before you begin, ensure you have:

A code editor (VSCode, Sublime, etc.)

Node.js and npm (if you will use a build step for Tailwind)

An Internet connection to fetch weather data

An API key from a weather data provider (e.g. OpenWeatherMap, WeatherAPI, etc.)

Getting Started

These steps will help you run HorizonWatch locally.

Cloning the Repo
git clone https://github.com/jafferafzalkhan/HorizonWatch.git
cd HorizonWatch

API Key Setup

Sign up (if needed) for a weather API provider like OpenWeatherMap
 or WeatherAPI
.

Copy your API key.

In the project folder, create a file to hold your environment variables. You might call it .env or something similar. (If the project setup doesn’t have one already, you’ll need to integrate its loading into the JS.)

Example .env:

WEATHER_API_KEY=your_api_key_here


In the script that fetches weather, make sure it uses the key. For example (in script.js):

const apiKey = process.env.WEATHER_API_KEY;
// or if not using build tools: replace a placeholder string
// e.g., const apiKey = "YOUR_KEY_HERE";


If you are using a build tool or bundler (Webpack, Vite, etc.), ensure it includes loading of .env (via dotenv or built-in support).

Installing Dependencies

If the project uses Tailwind via npm / PostCSS, run:

npm install


or

yarn install


If the project is purely static (no build tool), you'll instead pull Tailwind via CDN or precompiled file. (See next section.)

Configuring Tailwind CSS

If using Tailwind locally:

Install Tailwind CSS:

npm install -D tailwindcss
npx tailwindcss init


This creates a tailwind.config.js file.

In tailwind.config.js, configure the content paths so Tailwind knows which files to scan for class names. For example:

module.exports = {
  content: [
    "./index.html",
    "./script.js",
    "./src/**/*.{html,js}"
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}


Create a CSS file (e.g. styles/tailwind.css) with Tailwind’s directives:

@tailwind base;
@tailwind components;
@tailwind utilities;


Set up a build script in package.json:

"scripts": {
  "build:css": "tailwindcss -i ./styles/tailwind.css -o ./dist/style.css --watch"
}


In your HTML file (index.html), link to the generated CSS (dist/style.css) rather than the old static CSS if replacing.

If you prefer, you can include Tailwind via CDN (good for prototypes):

<link href="https://cdn.tailwindcss.com" rel="stylesheet">


Then use Tailwind classes directly in your HTML. But some advanced features (purging unused CSS etc.) require the npm / build setup.

Running the App Locally

If using build tools: start the CSS build (watching) and open index.html in a browser. Example:

npm run build:css


Open the HTML file in browser. If you have a development server (e.g. live-server or use VSCode’s “Live Preview”), that helps with auto-reloading.

Ensure geolocation permissions are allowed (if the app tries to detect your location).

Test city search, dark/light toggle, forecasts.

Project Structure

Here’s a possible layout (adjust based on what’s in your repo):

HorizonWatch/
│
├── index.html          # main HTML file
├── script.js           # JavaScript logic: API calls, DOM manipulation
├── style.css           # existing CSS (may be replaced or combined with Tailwind-generated CSS)
├── dist/               # built files (CSS, etc.)
├── styles/             # if using Tailwind input CSS files
├── tailwind.config.js   # Tailwind configuration
├── .env                # environment variables (not committed)
└── images/             # e.g. background images, etc.

How It Works / Important Code Paths

API Fetching: The script contacts the weather API (e.g. via fetch(“https://api.weatherprovider.com/data?…”)) using your API key. Make sure to handle errors (network issues, invalid API responses).

Geolocation: If user grants permission, get user’s location via navigator.geolocation and fetch weather for that location.

Search: An input field allows typing a city; on submit, fetch weather for that city.

Dark / Light Mode: Either via a toggle that adds/removes a class (e.g. dark) on body, or detect system preference. Store the choice in localStorage so it persists.

Forecast Display: Parse the response to extract current weather and 5-day forecast; update DOM accordingly.

Deployment

To deploy, you can:

Use GitHub Pages (just push the built HTML / CSS / JS, ensure relative paths are correct).

Use Netlify / Vercel / Surge etc. You may need a build step (for Tailwind) before deployment.

Make sure API key is handled safely. If possible, use a server-side proxy or environment Variable provided via your hosting platform so the key isn’t exposed in client side (if the API policy demands).

Troubleshooting
Problem	Possible Solution
Weather data doesn’t show / “Invalid API key”	Check your API key, ensure it’s correctly placed, no extra spaces.
Tailwind classes not applying	Make sure your HTML includes the generated CSS; check whether purging is removing unused classes; check content paths in tailwind.config.js.
Dark mode not persisting	Ensure localStorage logic works; class name toggling is correct; body/class binding is in correct place.
Geolocation fails	Check browser permissions; provide fallback (e.g. search by city).
Contributing

If you want to contribute:

Fork the repository

Create a feature branch (git checkout -b feature-xyz)

Make changes and test

Commit and push (git commit -m "Add …", git push)

Open a Pull Request; describe what you have changed

License

Specify your license here (e.g. MIT, Apache, etc.). For example:

MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy …
