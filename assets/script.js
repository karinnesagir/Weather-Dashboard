// var APIKey = "1176bfc8259456c8f8556deafe7e5201";

var city;

var input = document.getElementById('input');
// var daysDisplay = document.getElementById('daysDisplay');
var searchButton = document.getElementById('searchButton');
var searchedCitiesList = document.getElementById('searchedCitiesList');
var content = document.getElementById('content');
var cityName = document.getElementById('cityName');
var searchedCities = document.getElementById('searchedCities');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var cityButton = document.querySelector('button');
var firstIcon = document.getElementById('firstIcon');
var iconPlacement = $('#iconPlacement');
var currentDay = $('#currentDay');


var iconUrl = '';
var forecastIcon = '';
var forecastIconUrl = '';
var forecastTemp = '';
var forecastTempF = '';
var forecastWind = '';
var forecastHumidity = '';



function getList(){

    localStorage.setItem("searchedCities", input.value);
    var searched = localStorage.getItem("searchedCities");
    displayWeatherContainer();

    // searchedCitiesList.textContent = "";

    // var getSearchedCities = JSON.stringify(localStorage.getItem("searchedCities")) || [];

    // for (i = 0; i < getSearchedCities.length; i++){
    //     var newSearchedCity = document.createElement("li");
    //     newSearchedCity.textContent = getSearchedCities[i].name;
    //     searchedCitiesList.appendChild(newSearchedCity);
        
    // }


    saveCities();

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


function generateCities(){
  searchedCitiesList.textContent = [];
  var cities = JSON.parse(localStorage.getItem("savedCities")) || [];

  for (i = 0; i < cities.length; i++){
      var newCity = document.createElement("button");
      newCity.setAttribute('class', 'city-button');
      newCity.textContent = cities[i].name;
      searchedCitiesList.appendChild(newCity);

      // cities.unshift(newCity);

    newCity.addEventListener("click", function() {

      var cityTerm = this.textContent;
      var city = cityTerm;
      var APIKey = '9a0abe5df014989833a4517d1984a3f4';
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  

      fetch(queryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          displayWeather(data, city);
        });
    });

      // newCity.textContent = cities[i].name;
      // searchedCitiesList.appendChild(newCity);

  }

  if(searchedCities.length >= 10){
      searchedCities.pop();
  }

  // if ($("#searchedCities").length >= 5) {
  // ($("#searchedCities[4]").remove());
  // }


}

          
//         });

//         searchedCitiesList.appendChild(newCity);

//         // var cityButton = document.querySelectorAll('.city-button');

//         // console.log(cityButton.value);
//       // function getCityButton(){
//       //   console.log('success');

//       // }
//       // console.log(cities.length);
     
//       // if(cities.length >= 5){
//       //   cities.pop();
//       // }

//         // newCity.textContent = cities[i].name;
//         // searchedCitiesList.appendChild(newCity);

//         // console.log(cityButton.textContent);
//     }

//     // if(searchedCities.length > 10){
//     //     searchedCities.pop();
//     // }


searchButton.addEventListener('click', getList);


function displayWeatherContainer(){
  content.style.display = 'block';


  var city = input.value;
  var APIKey = '9a0abe5df014989833a4517d1984a3f4';
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  console.log(fetch(queryURL));


  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // console.log(cityID);
      displayWeather(data, city);
    });

}





var iconImage = $("<img>");




function displayWeather(weatherData, thisCity){

  cityName.textContent = thisCity.toUpperCase();

  // Displaying the current date in the header of the page
  var currentDate = dayjs().format('(MM/DD/YYYY)');
  $('#currentDay').html(currentDate);


  var tomorrow = dayjs().add(1, 'day').format('(MM/DD/YYYY)');
  // var tomorrow = currentDate.add(1, 'day');
  console.log(tomorrow);


  // console.log(weatherData);


  iconCode = weatherData.weather[0].icon;
  iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
  iconImage.attr('src', iconUrl);
  iconPlacement.append((iconImage));



  var APIKey = '9a0abe5df014989833a4517d1984a3f4';
  var cityID = weatherData.id;
  var newUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&appid=' + APIKey;
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
  // console.log(tempData);
  var tempF = ((tempData - 273.15) * 1.80 + 32).toFixed(2);
  // console.log(tempF);
  temp.textContent = " " + tempF + " ºF";

  var windData = weatherData.wind.speed;
  // console.log(windData);
  wind.textContent = " " + windData + " MPH";

  var humidityData = weatherData.main.humidity;
  humidity.textContent = " " + humidityData + " %"

};


// var imgEl = '';
// var cardEl = '';
// var cardBlockDiv = '';
// var cardTextDiv = '';
// var tempEl = '';
// var windEl = '';
// var humidityEl = '';

function getForecastData(forecastData){

  console.log(forecastData);

  $(".card-deck").empty();

  for (i = 0; i < 5; i++){
    forecastIcon = forecastData.list[i].weather[0].icon;
    forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
    forecastTemp = forecastData.list[i].main.temp;
    forecastTempF = ((forecastTemp - 273.15) * 1.80 + 32).toFixed(2);
    forecastWind = forecastData.list[i].wind.speed;
    forecastHumidity = forecastData.list[i].main.humidity;
    displayForecast();
  }

}



// function resetGlobalVariables() {
//   city = "";
//   iconUrl = '';
//   forecastIcon = '';
//   forecastIconUrl = '';
//   forecastTemp = '';
//   forecastTempF = '';
//   forecastWind = '';
//   forecastHumidity = '';
// }



function displayForecast() { 
  
  
  // var imgEl = $("<img>").attr("src", forecastIcon);  
  var cardEl = $("<div class='card'>").addClass("pl-1 text-light");
  var cardBlockDiv = $("<div>").attr("class", "card-block");
  // var cardTitleDiv = $("<div>").attr("class", "card-block");
  // var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
  var cardTextDiv = $("<div>").attr("class", "card-text");
  var tempEl = $("<p>").text("Temp: " + forecastTempF + " ºF");
  var windEl = $('<p>').text("Wind: " + forecastWind + " MPH");
  var humidityEl = $("<p>").text("Humidity: " + forecastHumidity + "%");

  
  // cardTextDiv.append(imgEl);
  cardTextDiv.append(tempEl);
  cardTextDiv.append(windEl);
  cardTextDiv.append(humidityEl);
  // cardTitleDiv.append(cardTitleHeader);
  // cardBlockDiv.append(cardTitleDiv);
  cardBlockDiv.append(cardTextDiv);
  cardEl.append(cardBlockDiv);
  $(".card-deck").append(cardEl);
  // $('.card-deck').html() = '';

}



// function forecast(){

//   var city = input.value;
//   var key = '9a0abe5df014989833a4517d1984a3f4';

//   var fiveDayQueryUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + key;
//   console.log(fetch(fiveDayQueryUrl));

// }


