const apiKey = "d884282f1ed86c9cb97ea7e59159397d"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {
    const city = document.getElementById("city-input").value;
    const weatherInfoDiv = document.getElementById("weather-info");
    const errorMessageDiv = document.getElementById("error-message");

    weatherInfoDiv.innerHTML = "";
    errorMessageDiv.innerHTML = "";

    if (!city) {
        errorMessageDiv.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const cityName = data.name;
            const country = data.sys.country;

            weatherInfoDiv.innerHTML = `
                <p><strong>${cityName}, ${country}</strong></p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        } else {
            errorMessageDiv.innerHTML = data.message || "City not found.";
        }
    } catch (error) {
        errorMessageDiv.innerHTML = "An error occurred. Please try again.";
        console.error("Error fetching weather data:", error);
    }
}

// API Endpoint Used:
// https://api.openweathermap.org/data/2.5/weather

// Data Retrieved:
// - name: City name
// - sys.country: Country code
// - main.temp: Temperature in Celsius (if units=metric)
// - weather[0].description: Weather description (e.g., "clear sky", "rain")
// - main.humidity: Humidity percentage
// - wind.speed: Wind speed in meters per second