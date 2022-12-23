var input = document.getElementById('input');
var searchButton = document.getElementById('searchButton');
var searchedCitiesList = document.getElementById('searchedCitiesList');
var content = document.getElementById('content');
var cityName = document.getElementById('cityName');
var searchedCities = document.getElementById('searchedCities');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var cityButton = document.querySelector('button');
var iconPlacement = $('#iconPlacement');
var currentDay = $('#currentDay');

var city = '';
var forecastDate = '';
var iconUrl = '';
var forecastIcon = '';
var forecastIconUrl = '';
var forecastTemp = '';
// var forecastTempF = '';
var forecastWind = '';
var forecastHumidity = '';
var currentDate = '';



searchButton.addEventListener('click', inputSearch);

// First function called
function inputSearch (){
  var value = input.value;

  if(value == ''){
    window.alert('Please search for a city.')
  } else {
    displayWeatherContainer(value);
  }
}


function saveCities(){
        var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

        if(savedCities.length == 5){
          savedCities.shift();
        }

        var currentCity = input.value.trim();
        var thisCity = {
            name : currentCity,
        };
        
        savedCities.push(thisCity);

        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        generateCities();
};


// Display searched cities
function generateCities(){
  searchedCitiesList.textContent = [];
  var cities = JSON.parse(localStorage.getItem("savedCities")) || [];

  for (i = 0; i < cities.length; i++){
      var newCity = document.createElement("button");

      newCity.setAttribute('class', 'city-button');

      newCity.textContent = cities[i].name.toUpperCase();
      searchedCitiesList.appendChild(newCity);
  
      newCity.addEventListener("click", function(e) {

      var cityTerm = this.textContent;
      var city = cityTerm;
      var APIKey = '9a0abe5df014989833a4517d1984a3f4';
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;

      fetch(queryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          displayWeather(data, city);
        });
    });
  }
};


function displayWeatherContainer(value){
  content.style.display = 'block';
  var city = value;
  var APIKey = '9a0abe5df014989833a4517d1984a3f4';
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&appid=" + APIKey;
  console.log(fetch(queryURL));

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if(data.cod == '404'){
        content.style.display = 'none';
        window. alert('Please search for a city.');
      } else {
      displayWeather(data, city);
      saveCities();
      }
    });
};

var iconImage = $("<img>");


function displayWeather(weatherData, thisCity){

  cityName.textContent = thisCity.toUpperCase();
  // Display the current date
  currentDate = dayjs().format('(MM/DD/YYYY)');
  $('#currentDay').html(currentDate);

  iconCode = weatherData.weather[0].icon;
  iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
  iconImage.attr('src', iconUrl);
  iconPlacement.append((iconImage));

  var APIKey = '9a0abe5df014989833a4517d1984a3f4';
  var cityID = weatherData.id;
  var newUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&id=' + cityID + '&appid=' + APIKey;
  console.log(fetch(newUrl)); 

  fetch(newUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    getForecastData(data);
  });

  var tempData = weatherData.main.temp;
  // var tempF = ((tempData - 273.15) * 1.80 + 32).toFixed(2);
  temp.textContent = " " + tempData + " ºF";
  var windData = weatherData.wind.speed;
  wind.textContent = " " + windData + " MPH";
  var humidityData = weatherData.main.humidity;
  humidity.textContent = " " + humidityData + " %"

};


// Create five day forecast
function getForecastData(forecastData){

  // console.log(forecastData);
  $(".card-deck").empty();

  for (i = 0; i < 5; i++){
    forecastDate = dayjs().add(i+1, 'day').format('MM/DD/YYYY');
    // console.log(forecastDate);
    forecastIcon = forecastData.list[i].weather[0].icon;
    forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
    forecastTemp = forecastData.list[i].main.temp;
    // forecastTempF = ((forecastTemp - 273.15) * 1.80 + 32).toFixed(2);
    forecastWind = forecastData.list[i].wind.speed;
    forecastHumidity = forecastData.list[i].main.humidity;
    displayForecast();
  }
};


// Display five day forecast
function displayForecast() { 
  
  var dateEl = $("<p>").text(forecastDate);
  var iconEl = $("<img>").attr("src", forecastIconUrl); 
  var cardBlockDiv = $("<div>").attr("class", "card-block");
  var cardTextDiv = $("<div>").attr("class", "card-text");
  var tempEl = $("<p>").text("Temp: " + forecastTemp + " ºF");
  var windEl = $('<p>').text("Wind: " + forecastWind + " MPH");
  var humidityEl = $("<p>").text("Humidity: " + forecastHumidity + "%");

  cardTextDiv.append(dateEl);
  cardTextDiv.append(iconEl);
  cardTextDiv.append(tempEl);
  cardTextDiv.append(windEl);
  cardTextDiv.append(humidityEl);
  cardBlockDiv.append(cardTextDiv);
  $(".card-deck").append(cardBlockDiv);
};