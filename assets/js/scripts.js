// const RATE_LIMIT_INTERVAL = 500000; // Set your desired time interval in milliseconds (e.g., 5000 for 5 seconds)
// let lastRequestTime = 0;
// async function fetchData() {
//   // Check if enough time has passed since the last request
//   const currentTime = Date.now();
//   const timeSinceLastRequest = currentTime - lastRequestTime;
//   if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
//     console.log(`Rate limit exceeded. Waiting for ${RATE_LIMIT_INTERVAL - timeSinceLastRequest} milliseconds before making the next request.`);
//     return;
//   }

// build API key to query the Local Business Data API
var localBusinessAPI =
  'https://local-business-data.p.rapidapi.com/search?query=';
var search = "Boston";
var url =
  'https://local-business-data.p.rapidapi.com/search?query=' + search + '%2&limit=1&lat=37.359428&lng=-121.925337&zoom=13&language=en&region=us';
var localBusinessQueryURL = localBusinessAPI + search;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": '527d223544msh7593dbae3035a4ap1bd98ajsn52505d117ee2',
    "X-RapidAPI-Host": 'local-business-data.p.rapidapi.com',
  },
};

// Create fetch call for the search query and log resulting object
function getLocalBusinessData() {
    return 'pizza hut'
    fetch(url, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(localBusinessQueryURL);
    console.log(data);
  })};

  getLocalBusinessData();


