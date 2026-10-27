
$(document).ready(function () {
    const STORAGE_KEY = "weather_recent_cities";

    let recentCities = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    // Display recent searches
    function renderRecent() {
        $("#recent").empty();

        recentCities.forEach(function (city) {
            const button = $("<button>")
                .text(city)
                .on("click", function () {
                    searchWeather(city);
                });

            $("#recent").append(button);
        });
    }

    // Save a city in localStorage
    function saveCity(city) {
        recentCities = recentCities.filter(
            item => item.toLowerCase() !== city.toLowerCase()
        );

        recentCities.unshift(city);
        recentCities = recentCities.slice(0, 5);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(recentCities)
        );

        renderRecent();
    }

    // Get weather description from the API code
    function getDescription(code) {
        const descriptions = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Foggy",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            61: "Light rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Light snowfall",
            73: "Moderate snowfall",
            75: "Heavy snowfall",
            80: "Rain showers",
            81: "Moderate rain showers",
            82: "Heavy rain showers",
            95: "Thunderstorm"
        };

        return descriptions[code] || "Variable conditions";
    }

    // Search for a city and fetch its weather
    function searchWeather(city) {
        $("#message").text("Fetching weather...");
        $("#city").text(city);

        // First AJAX request: find city coordinates
        $.ajax({
            url: "https://geocoding-api.open-meteo.com/v1/search",
            method: "GET",
            data: {
                name: city,
                count: 1,
                language: "en",
                format: "json"
            },
            success: function (result) {
                if (!result.results || result.results.length === 0) {
                    $("#message").text("City not found. Try another name.");
                    return;
                }

                const place = result.results[0];

                // Second AJAX request: get weather data
                $.ajax({
                    url: "https://api.open-meteo.com/v1/forecast",
                    method: "GET",
                    data: {
                        latitude: place.latitude,
                        longitude: place.longitude,
                        current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
                        timezone: "auto"
                    },
                    success: function (data) {
                        const weather = data.current;
                        const code = weather.weather_code;
                        let art = "sun-cloud";

                        if ([0, 1].includes(code)) {
                            art = "sun";
                        } else if ([45, 48].includes(code)) {
                            art = "fog";
                        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(code)) {
                            art = "rain";
                        } else if ([71, 73, 75].includes(code)) {
                            art = "snow";
                        }

                        $("#weatherArt").attr("data-weather", art);

                        $("#city").text(
                            place.name + (place.country ? ", " + place.country : "")
                        );

                        $("#temperature").text(
                            Math.round(weather.temperature_2m) + "°C"
                        );

                        $("#description").text(
                            getDescription(weather.weather_code)
                        );

                        $("#feelsLike").text(
                            Math.round(weather.apparent_temperature) + "°C"
                        );

                        $("#humidity").text(
                            weather.relative_humidity_2m + "%"
                        );

                        $("#wind").text(
                            weather.wind_speed_10m + " km/h"
                        );

                        $("#message").text(
                            "Updated at " + weather.time.replace("T", " ")
                        );

                        saveCity(place.name);
                    },
                    error: function () {
                        $("#message").text("Unable to fetch weather data.");
                    }
                });
            },
            error: function () {
                $("#message").text("Unable to search for this city.");
            }
        });
    }

    // Handle the search form
    $("#weatherForm").on("submit", function (event) {
        event.preventDefault();

        const city = $("#cityInput").val().trim();

        if (city) {
            searchWeather(city);
        }
    });

    renderRecent();
});
