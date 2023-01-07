const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const searchCity = (query) => {
const apiKey = "13bbca09f780cf4019927003875c9594"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`
const input = event.currentTarget.querySelector(".form-control")

fetch(url)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    replaceBox1(data);
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
  document.getElementById("far").innerHTML = `${data.main.temp}°`
  document.getElementById("feels").innerHTML = `feels like ${data.main.feels_like}°`
  document.getElementById("hilo").innerHTML = `Hi ${data.main.temp_max}° Low ${data.main.temp_min}°`
  document.getElementById("date").innerHTML = `${monthNames[currentDate.getMonth()]} ${currentDate.getDay()}, ${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
}
