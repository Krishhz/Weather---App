    // api ka kaam 
const apiKey = "c194978aa180fbbc3fd7e88178360f3e"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric"

// search aur input button
const searchBtn = document.getElementById("searchBtn")
const searchBox = document.getElementById("cityInput")

// icons ko variable me store krte hai
const wIcon = document.querySelector(".w-icon")
const temp = document.querySelector(".temp")
const city = document.querySelector(".city")
const humid = document.querySelector(".humidity")
const wind = document.querySelector(".wind")

// renamed function: getWet → getWeather
async function getWeather(cityName) {
    const response = await fetch(apiURL + `&q=${cityName}&appid=${apiKey}`)
    
    if (response.status == 404) {
        alert("Nahi mil raha bhai tera city!")
        return;
    }

    const data = await response.json()

    // ab update karenge
    city.textContent = data.name
    temp.textContent = Math.round(data.main.temp) + "°C"
    humid.textContent = data.main.humidity + "%"
    wind.textContent = data.wind.speed + "km/h"

    // Change icon based on weather
    const weatherMain = data.weather[0].main;
    if (weatherMain === "Clouds") {
        wIcon.src = "clouds.png";
    } else if (weatherMain === "Clear") {
        wIcon.src = "clear.png";
    } else if (weatherMain === "Rain") {
        wIcon.src = "rain.png";
    } else if (weatherMain === "Drizzle") {
        wIcon.src = "drizzle.png";
    } else if (weatherMain === "Mist") {
        wIcon.src = "mist.png";
    } 
}

// eventlistener
searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value
    console.log("Search started for:", cityName); // NEW extra log
    if (cityName !== "") {
        getWeather(cityName)
    }
})

searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
