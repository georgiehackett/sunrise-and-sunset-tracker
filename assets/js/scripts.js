window.addEventListener("DOMContentLoaded", () => {
localStorage.getItem('userInput');

  const searchInput = document.getElementById("searchInput");
  const selectedCities = document.getElementById("selectedCities");
  const searchButton = document.getElementById("searchButton");

  let lastRequestTime = 0;
  const RATE_LIMIT_INTERVAL = 1000; // 1 request per second
  const uniqueCities = new Set();

// console.log(searchInput);
  searchInput.addEventListener("input", async () => {
    await searchCities();
  });

//   console.log(searchButton);
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
    )}&minPopulation=1000000&limit=10`;
    window.localStorage.setItem('searchInputValue', searchInputValue)
    // console.log();

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": '2bc7977f0fmsh03730ae70cbb1efp1bb187jsnc102c4435097',
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };
    window.localStorage.setItem('options', JSON.stringify(options));

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        selectedCities.innerHTML = ""; // Clear previous results
        uniqueCities.clear();

        result.data.forEach((city) => {
          const cityName = `${city.city}, ${city.country?.countryCode || ""}`;
          console.log(city);

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

});
