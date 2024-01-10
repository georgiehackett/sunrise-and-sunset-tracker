// Build URL to query sunrisesunset API 
var lat = '';
var lng = '';
var sunriseSunsetURL = 'https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873'

// Create fetch call for the search query
fetch(sunriseSunsetURL)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    // console.log(data);

    // Assign data from the object to variables
    var sunrise = data.results.sunrise;
    console.log('Sunrise: ' + sunrise);

    var sunset = data.results.sunset;
    console.log('Sunset: ' + sunset);
    
    var goldenHour = data.results.golden_hour;
    console.log('Golden Hour: ' + goldenHour);

    var timezone = data.results.timezone;
    console.log('Timezone: ' + timezone);
});