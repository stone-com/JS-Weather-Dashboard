//create variables for html elements 
var citySearchEl = $('#city-search');
var citySearchBtn = $('#city-search-btn');
var searchHistory = $('#search-history');
var clearBtn = $('#clear-button');
var currentCity = $('#current-city');
var todaysTemp = $('#today-temp');
var todaysHumidity = $('#today-humidity');
var todaysWind = $('#today-wind');
var uvIndex = $('#uv-index');
var weatherDiv = $('#weather-div');
var todayWeatherIcon = $('#today-weather-icon')
var apiKey = '09d461ad63726baf5fb6254f0131796b' //save my API key to a variable

//get current date from moment.js
var todaysDate = moment().format('L');
//display current date on the page next to city name
$('#today-date').text(` ${todaysDate}`);

//create empty array for city list search history
var cities = [];

// create variable for current city that was searched
var cityNamess = ''
//function to get current weather conditions

function getConditions(cityName) {
    var searchQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    console.log(searchQueryUrl);

    fetch(searchQueryUrl)
        .then(function (response) {

            return response.json()

        }).then(function (data) {
            console.log(data);
            //display city name and today weather icon
            currentCity.textContent = data.name;
            currentCity.text(data.name)
            todayWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            //display wind, temp, and humidity for current day
            todaysTemp.text("Temp: " + data.main.temp + " °F");
            todaysWind.text("wind: " + data.wind.speed + " MPH");
            todaysHumidity.text("Humidity: " + data.main.humidity + " %");


            var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIkey
            fetch(uvUrl)
                .then(function (response) {

                    return response.json()

                }).then(function (data) {

                    console.log(uvUrl)

                    nowIndexNumberEl.textContent = data.current.uvi

                    console.log(nowIndexNumberEl)
                    if (data.current.uvi <= 2) {
                        nowIndexNumberEl.setAttribute("class", "favorable")
                    } else if (data.current.uvi > 2 && data.current.uvi <= 8) {
                        nowIndexNumberEl.setAttribute("class", "moderate")
                    }
                    else if (data.current.uvi > 8) {
                        nowIndexNumberEl.setAttribute("class", "severe")
                    };

                    console.log(nowIndex)

                }
                )

        })
   
};


getConditions('london');

