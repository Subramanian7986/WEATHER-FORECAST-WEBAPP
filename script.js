const apiKey = "2a45f905bdd848124cb2af5c3f7760e5"; // Your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('city').value;
    const errorMessage = document.getElementById('error-message');
    const weatherImg = document.getElementById('weather-img');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const windSpeed = document.getElementById('wind-speed');
    const airQuality = document.getElementById('air-quality');
    const weatherType = document.getElementById('weather-type');

    // Clear previous info
    errorMessage.innerHTML = '';
    weatherImg.src = '';
    cityName.innerHTML = '';
    temperature.innerHTML = '';
    windSpeed.innerHTML = '';
    airQuality.innerHTML = '';
    weatherType.innerHTML = '';

    if (city === '') {
        errorMessage.innerHTML = 'Please enter a city name.';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                errorMessage.innerHTML = 'Invalid city name. Please try again.';
                return;
            }

            const weatherCondition = data.weather[0].main.toLowerCase();
            const imgSrc = getWeatherImage(weatherCondition);

            const testImg = new Image();
            testImg.src = imgSrc;

            testImg.onload = () => {
                weatherImg.src = imgSrc;
            };
            testImg.onerror = () => {
                console.warn(`Image not found for '${weatherCondition}'. Falling back to default.`);
                weatherImg.src = 'images/clear.png';
            };

            cityName.innerHTML = `${data.name}, ${data.sys.country}`;
            temperature.innerHTML = `Temperature: ${data.main.temp}°C`;
            windSpeed.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
            airQuality.innerHTML = `Air Quality: ${data.main.humidity}% Humidity`;
            weatherType.innerHTML = `Weather: ${data.weather[0].main}`;
        })
        .catch(error => {
            console.error(error);
            errorMessage.innerHTML = 'Error fetching weather data. Please try again later.';
        });
}

function getWeatherImage(condition) {
    const map = {
        clear: 'images/clear.png',
        clouds: 'images/clouds.png',
        drizzle: 'images/drizzle.png',
        mist: 'images/mist.png',
        rain: 'images/rain.png',
        snow: 'images/snow.png',
        haze: 'images/mist.png',
        fog: 'images/mist.png',
        smoke: 'images/mist.png',
        thunderstorm: 'images/rain.png'
    };
    return map[condition] || 'images/clear.png';
}
