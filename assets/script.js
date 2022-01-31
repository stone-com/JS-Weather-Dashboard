//create variables for html elements 
var citySearchEl = $('#city-search');
var citySearchBtn = $('#city-search-btn');
var searchHistory = $('#search-history');
var clearBtn = $('#clear-button');
var currentCity = $('#current-city');
var todaysTemp = $('#today-temp');
var todaysHumidity = $('#today-humidity');
var todaysWind = $('#today-wind');
var uv = $('#uv');
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
var cityNamexxxxxx = ''
//function to get current weather conditions

function getConditions(cityName) {
    var searchQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    console.log(searchQueryUrl);
    //fetch daily weather info for city that was searched (cityname variable)
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
            todaysTemp.text(data.main.temp + " °F");
            todaysWind.text(data.wind.speed + " MPH");
            todaysHumidity.text(data.main.humidity + " %");

            //fetch call using onecall api for uv data using lat and long  data from previous fetch
            var uvFetchUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey
            fetch(uvFetchUrl)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    //vriable for current uv index value,
                    var uvToday = data.current.uvi; 
                    uvIndex.text(uvToday);
                    console.log(uvToday);
                    //check current UV index value, change class depending on value
                    if (uvToday <= 2) {
                        uv.addClass('favorable');
                    } else if (uvToday > 2 && uvToday <= 8) {
                        uv.addClass('moderate');
                    }
                    else if (uvToday > 8) {
                        uv.addClass('severe');
                    };
                }
                )

        })
   
};

//function to get 5 day forecast

function get5DayForecast(cityname) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&cnt=5&units=imperial&appid=" + apiKey;
    
    fetch(forecastURL)
        .then(function (response) {
            return response.json()

        }).then(function (forecastData) {
            var forecastArray = [];
            console.log(forecastData);
            for (var i = 0; i < forecastData.list.length; i++) {
                forecastArray.push({
                    date: forecastData.list[i].dt_txt.split(" ")[0],
                    icon: forecastData.list[i].weather[0].icon,
                    temp: forecastData.list[i].main.temp,
                    wind: forecastData.list[i].wind.speed,
                    humidity: forecastData.list[i].main.humidity,
                })
            }
            console.log(forecastArray);
        })
}

// getConditions('london');
get5DayForecast('london');