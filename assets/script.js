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


// var searchedCitiesList = [];


// makes an API call using just the city name
// api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey};


// var searched = localStorage.getItem("searchedCities");



function getList(){

    localStorage.setItem("searchedCities", input.value);

    // var getSearchedCities = JSON.parse(localStorage.getItem("searchCities"));
    // searchedCitiesList = getSearchedCities;

    var searched = localStorage.getItem("searchedCities");
    // searchedCitiesList.textContent = searched; 
    // cityName.textContent = searched;

    displayWeatherContainer();




    // displaySearchedCities();


    searchedCitiesList.textContent = "";

    var getSearchedCities = JSON.stringify(localStorage.getItem("searchedCities")) || [];

    for (i = 0; i < getSearchedCities.length; i++){
        var newSearchedCity = document.createElement("li");
        newSearchedCity.textContent = getSearchedCities[i].name;
        searchedCitiesList.appendChild(newSearchedCity);
        
    }

    saveCities();

}


function saveCities(){
    
        var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
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
        // var cityButton = document.querySelectorAll('.city-button');

        // console.log(cityButton.value);
      // function getCityButton(){
      //   console.log('success');

      // }

      $(".city-button").on("click", function() {

        var cityTerm = this.textContent;
        // console.log(cityTerm);
        // input.value = cityTerm;
        // displayWeatherContainer();
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

        // console.log(cityButton.textContent);
    }

    // if(searchedCities.length > 10){
    //     searchedCities.pop();
    // }

    // if ($("#searchedCities").length >= 5) {
    // ($("#searchedCities[4]").remove());
    // }


}


searchButton.addEventListener('click', getList);

// var city = input.value;
// var APIKey = '9a0abe5df014989833a4517d1984a3f4';



function displayWeatherContainer(){
  content.style.display = 'block';


  var city = input.value;
  var APIKey = '9a0abe5df014989833a4517d1984a3f4';
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  console.log(fetch(queryURL));

  // var fiveDayQueryUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey;

  // var thirdApiKey = '19fa377ac8577cad68d1d6fe1353abf6';

  // var key = '1176bfc8259456c8f8556deafe7e5201';
  // var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&appid=" + key;
  // var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=' + key;
  // var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey + "&cnt=5";
  // var newUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&cnt=5&appid=' + thirdApiKey;

  // var newUrl = 'api.openweathermap.org/data/2.5/forecast?id=2643743&appid=' + APIKey;
  // console.log(fetch(newUrl));








  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // console.log(cityID);
      displayWeather(data, city);
    });


  // fetch(forecastUrl)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //     // displayWeather(data, city);
  //   });
}






function displayWeather(weatherData, thisCity){

  // iconImage.textContent = '';

  cityName.textContent = thisCity.toUpperCase();

  // Displaying the current date in the header of the page
  var currentDate = dayjs().format('(MM/DD/YYYY)');
  $('#currentDay').html(currentDate);


  // var tomorrow = currentDate.dayjs() + 1;
  // console.log(tomorrow);




  iconCode = weatherData.weather[0].icon;
  // console.log(iconCode);
  iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";


  var iconImage = $("<img>");

  iconImage.attr('src', iconUrl);
  // .attr('src', iconUrl);
  // console.log((iconImage));
  iconPlacement.append((iconImage));
  // iconPlacement.textContent = iconImage



  var APIKey = '9a0abe5df014989833a4517d1984a3f4';
  var cityID = weatherData.id;
  // console.log(cityID);
  var newUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&appid=' + APIKey;
  console.log(fetch(newUrl)); 


  fetch(newUrl)
  .then(function (response) {
    return response.json();
    
  })
  .then(function (data) {
    console.log(data);
    // console.log(cityID);
    getForecastData(data);
  });





  // var dayOne = $("<div>");




  // console.log(weatherData);

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

  // forecast();
};

function getForecastData(forecastData){

  console.log(forecastData);

  for (i = 0; i < 5; i++){
    forecastIcon = forecastData.list[i].weather[0].icon;
    forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png";
    forecastTemp = forecastData.list[i].main.temp;
    forecastTempF = ((forecastTemp - 273.15) * 1.80 + 32).toFixed(2);
    forecastWind = forecastData.list[i].wind.speed;
    console.log(forecastWind);
    forecastHumidity = forecastData.list[i].main.humidity;
    displayForecast();
  }

}




function displayForecast() { 
  var imgEl = $("<img>").attr("src", forecastIcon);  
  var cardEl = $("<div class='card'>").addClass("pl-10 bg-primary text-light");
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
}



// function forecast(){

//   var city = input.value;
//   var key = '9a0abe5df014989833a4517d1984a3f4';

//   var fiveDayQueryUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + key;
//   console.log(fetch(fiveDayQueryUrl));

// }


