window.addEventListener("DOMContentLoaded", () => {
  var searchInputValue = window.localStorage.getItem('searchInputValue').toString();
  console.log(searchInputValue);
  var options = JSON.parse(window.localStorage.getItem('options'));
  console.log(options);
  var geoDBURL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix='+ searchInputValue +'&minPopulation=1000000&limit=10';
  console.log(geoDBURL);

  fetch(geoDBURL, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      console.log(data.data[0]);

      var lat = data.data[0].latitude;
      var lng = data.data[0].longitude;

      // Build URL to query sunrisesunset API using the obtained latitude and longitude
      var sunriseSunsetURL = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`;

      // Create fetch call for the sunrisesunset API query
      fetch(sunriseSunsetURL)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var sunrise = data.results.sunrise;
          console.log("Sunrise: " + sunrise);

          var sunset = data.results.sunset;
          console.log("Sunset: " + sunset);

          var goldenHour = data.results.golden_hour;
          console.log("Golden Hour: " + goldenHour);

          var timezone = data.results.timezone;
          console.log("Timezone: " + timezone);
        });
    })
    .catch(function(error) {
      console.error('Error fetching city data:', error);
    });
});
