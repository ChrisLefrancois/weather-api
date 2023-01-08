const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const searchCity = (query) => {
const apiKey = "13bbca09f780cf4019927003875c9594"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
const input = event.currentTarget.querySelector(".form-control")

fetch(url)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    replaceBox1(data);
    getMap(data);
    replaceBox4(data);
    input.value = ""
  })
}

const form = document.querySelector("#search-form")

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector(".form-control")
  searchCity(input.value)
})

const replaceBox1 = (data) => {
  let currentDate = new Date()

  document.getElementById("city").innerHTML = data.name
  document.getElementById("far").innerHTML = `${Math.round(data.main.temp)}°C`
  document.getElementById("feels").innerHTML = `feels like ${Math.round(data.main.feels_like)}°C`
  document.getElementById("hilo").innerHTML = `Hi ${Math.round(data.main.temp_max)}°C Low ${Math.round(data.main.temp_min)}°C`
  document.getElementById("date").innerHTML = `${monthNames[currentDate.getMonth()]} ${currentDate.getDay()}, ${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
}

const replaceBox4 = (data) => {
  document.getElementById("wind").innerHTML = `<h3>${data.wind.speed} MPH</h3><h3>Wind</h3>`
  document.getElementById("humidity").innerHTML = `<h3>${data.main.humidity}%</h3><h3>Humidity</h3>`
  document.getElementById("weather").innerHTML = `<h3>${data.weather[0].main}</h3><h3>Weather</h3>`
}

const getMap = (data) => {
  url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${data.coord.lon},${data.coord.lat},8,0/300x200?access_token=pk.eyJ1IjoiY2hyaXN0b3BoZXJsZWZyYW5jb2lzMSIsImEiOiJjbGJsMmV4d2YwM2pxM25ueXhiY2NmZzBzIn0.ycplvem5Ndch3oqrqKt5Vg`
  document.getElementById("map").src = url
}
