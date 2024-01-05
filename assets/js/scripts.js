/* const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/places/46343/nearbyPlaces?radius=3';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '727bf2a82fmshefe63c31b6e70d3p1bee3djsnb96f9b215838',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
} */


const RATE_LIMIT_INTERVAL = 500000; // Set your desired time interval in milliseconds (e.g., 5000 for 5 seconds)
let lastRequestTime = 0;

async function fetchData() {
  // Check if enough time has passed since the last request
  const currentTime = Date.now();
  const timeSinceLastRequest = currentTime - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
    console.log(`Rate limit exceeded. Waiting for ${RATE_LIMIT_INTERVAL - timeSinceLastRequest} milliseconds before making the next request.`);
    return;
  }

  // If not, proceed with the API request
  const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/places/46343/nearbyPlaces?radius=3';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '727bf2a82fmshefe63c31b6e70d3p1bee3djsnb96f9b215838',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    // Update the last request time
    lastRequestTime = currentTime;
  }
}

// Call the async function
fetchData();