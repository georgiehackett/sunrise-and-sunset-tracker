// window.addEventListener("DOMContentLoaded", () => {
//   // Retrieve stored user input from local storage
//   const storedUserInput = localStorage.getItem("userInput");
//   const searchInput = document.getElementById("searchInput");
//   const selectedCities = document.getElementById("selectedCities");
//   const searchButton = document.getElementById("searchButton");

//   // Set the search input value to the stored user input
//   searchInput.value = storedUserInput;

//   let lastRequestTime = 0;
//   const RATE_LIMIT_INTERVAL = 1000; // 1 request per second
//   const uniqueCities = new Set();

//   searchInput.addEventListener("input", async () => {
//     await searchCities();
//   });

//   searchButton.addEventListener("click", async () => {
//     await searchCities();
//   });

//   async function searchCities() {
//     const searchInputValue = searchInput.value.trim();

//     if (!searchInputValue) {
//       selectedCities.innerHTML = "";
//       return;
//     }

//     const currentTime = Date.now();
//     const timeSinceLastRequest = currentTime - lastRequestTime;

//     if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
//       console.log(
//         `Rate limit exceeded. Waiting for ${
//           RATE_LIMIT_INTERVAL - timeSinceLastRequest
//         } milliseconds before making the next request.`
//       );

//       setTimeout(async () => {
//         await searchCities();
//       }, RATE_LIMIT_INTERVAL - timeSinceLastRequest);

//       return;
//     }

//     const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
//       searchInputValue
//     )}&minPopulation=1000000&limit=10`;

//     localStorage.setItem("searchInputValue", searchInputValue);

//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "727bf2a82fmshefe63c31b6e70d3p1bee3djsnb96f9b215838",
//         "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
//         "Content-Type": "application/json",
//       },
//     };

//     localStorage.setItem("options", JSON.stringify(options));

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();

//       if (result.data && result.data.length > 0) {
//         selectedCities.innerHTML = "";
//         uniqueCities.clear();

//         result.data.forEach((city) => {
//           const cityName = `${city.city}, ${city.country?.countryCode || ""}`;

//           if (!uniqueCities.has(cityName)) {
//             uniqueCities.add(cityName);
//             const listItem = document.createElement("li");
//             listItem.textContent = cityName;

//             listItem.addEventListener("click", () => {
//               searchInput.value = cityName;
//               selectedCities.innerHTML = "";
//             });

//             selectedCities.appendChild(listItem);
//           }
//         });

//         selectedCities.style.display = "block";
//       } else {
//         selectedCities.innerHTML = `<li>No results found for ${searchInputValue}</li>`;
//       }

//       lastRequestTime = Date.now();
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   document.addEventListener("click", function (event) {
//     if (!event.target.closest(".dropdown-container")) {
//       selectedCities.style.display = "none";
//     }
//   });
// });
const searchInput = document.getElementById("searchInput");
const selectedCities = document.getElementById("selectedCities");
const searchButton = document.getElementById("searchButton");

let lastRequestTime = 0;
const RATE_LIMIT_INTERVAL = 100; // 1 request per second
const DEBOUNCE_DELAY = 300; // Adjust the delay as needed
const uniqueCities = new Set();

let debounceTimer;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await searchCities();
  }, DEBOUNCE_DELAY);
});

searchButton.addEventListener("click", async () => {
  await searchCities();
});

async function searchCities() {
  const searchInputValue = searchInput.value.trim();
  if (!searchInputValue) {
    // Clear the dropdown when the input is empty
    selectedCities.innerHTML = "";
    return;
  }

  const currentTime = Date.now();
  const timeSinceLastRequest = currentTime - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
    console.log(
      `Rate limit exceeded. Please wait before making the next request.`
    );
    return;
  }

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
    searchInputValue
  )}&minPopulation=10000000&limit=10`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9d2ae5353dmsh1aa3fa45c8e8d41p18b3e6jsnb44eaf29e68d",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.data && result.data.length > 0) {
      selectedCities.innerHTML = ""; // Clear previous results
      uniqueCities.clear();

      result.data.forEach((city) => {
        const cityName = `${city.city}, ${city.country?.countryCode || ""}`;

        if (!uniqueCities.has(cityName)) {
          uniqueCities.add(cityName);

          const listItem = document.createElement("li");
          listItem.textContent = cityName;

          listItem.addEventListener("click", () => {
            searchInput.value = cityName;
            selectedCities.innerHTML = ""; // Clear the dropdown after selection
          });

          selectedCities.appendChild(listItem);
        }
      });

      // Show the dropdown
      selectedCities.style.display = "block";
    } else {
      selectedCities.innerHTML = `<li>No results found for ${searchInputValue}</li>`;
    }

    lastRequestTime = Date.now();
  } catch (error) {
    console.error(error);
  }
}

// Hide the dropdown when clicking outside of it
document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown-container")) {
    selectedCities.style.display = "none";
  }
});
