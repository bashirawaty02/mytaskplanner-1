/*WEATHER SEARCH BY USING A CITY NAME (e.g. athens) */
const weatherForm = document.querySelector(".widgets .weatherForm");
const input = document.querySelector(".widgets input");
const msg = document.querySelector(".widgets #errorMsg");
const apiKey = "b8bf0ed1c987b492d0b3d6cfc25f3fce";

function fetchWeather (city) {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const { name } = data;
        const { icon, description } = data.weather[0];
        let { temp } = data.main;
        temp = Math.round(temp);

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".weather").classList.remove("loading");
  })
};





weatherForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // let inputVal = input.value;
    let weatherCity = document.getElementById('weatherCity').value;
    localStorage.setItem("city", weatherCity);
    
    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { name } = data;
            const { icon, description } = data.weather[0];
            let { temp } = data.main;
            temp = Math.round(temp);

            document.querySelector(".city").innerText = name;
            document.querySelector(".icon").src =
                "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".weather").classList.remove("loading");

            
        })
        .catch(() => {
            msg.textContent = "Please input a valid city";
        });

  msg.textContent = "";
  weatherForm.reset();
  input.focus();
});


function loadWeather() {
    let storedCity = localStorage.getItem("city");
    if (storedCity === null || storedCity === "") {
        fetchWeather("Sydney");
    } else {
        // const parseCoords = JSON.parse(storedCity);
        fetchWeather(storedCity);
    } 
}

loadWeather();
