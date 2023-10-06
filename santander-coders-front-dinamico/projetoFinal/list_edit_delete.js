async function addCountry() {
  const countryName = document.getElementById("country").value;
  if (countryName) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data for ${countryName}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.length > 0) {
        const countryInfo = data[0];
        console.log("Country Info:", countryInfo);

        const travelData =
          JSON.parse(sessionStorage.getItem("travelData")) || [];
        const entry = {
          country: countryName,
          flag: `https://restcountries.com/data/${countryInfo.alpha2Code.toLowerCase()}.svg`,
        };

        travelData.push(entry);
        sessionStorage.setItem("travelData", JSON.stringify(travelData));

        document.getElementById("country").value = "";

        displayTravelList();
      } else {
        alert("Country not found.");
      }
    } catch (error) {
      console.error("Error fetching country information:", error);
    }
  }
}

async function displayTravelList() {
  const travelList = document.getElementById("travelList");

  travelList.innerHTML = "";

  const travelData = JSON.parse(sessionStorage.getItem("travelData")) || [];

  for (let index = 0; index < travelData.length; index++) {
    const entry = travelData[index];

    const flagUrl = await getFlagImageUrl(entry.country);

    const li = document.createElement("li");
    li.innerHTML = `
          <strong>Country:</strong> ${entry.country}<br>
          <strong>Flag:</strong> <img src="${flagUrl}" alt="${
      entry.country
    } flag" style="width: 50px; height: 30px;"><br> <!-- Display the flag image -->
          <strong>Arrival Date:</strong> ${entry.arrivalDate}<br>
          <strong>Departure Date:</strong> ${entry.departureDate}<br>
          <strong>Money Spent:</strong> ${entry.money} ${entry.currency}<br>
          <strong>Rating:</strong> ${entry.rating}<br>
          <strong>Cities:</strong> ${
            entry.cities ? entry.cities.join(", ") : "None"
          }<br>
          <button onclick="viewCountryInfo(${index})">View Info</button>
          <button onclick="addCities(${index})">Add City</button>
          <button onclick="editEntry(${index})">Edit</button>
          <button onclick="deleteEntry(${index})">Delete</button>
        `;
    travelList.appendChild(li);
  }
}

async function getFlagImageUrl(countryName) {
  try {
    const formattedCountryName = countryName.replace(/ /g, "_");

    const response = await fetch(
      `https://restcountries.com/v2/name/${formattedCountryName}`
    );
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0 && data[0].flags) {
      return data[0].flags.svg;
    } else {
      return "default-flag-image-url.jpg";
    }
  } catch (error) {
    console.error("Error fetching flag image:", error);
    return "default-flag-image-url.jpg";
  }
}

function viewCountryInfo(index) {
  const travelData = JSON.parse(sessionStorage.getItem("travelData")) || [];
  const entry = travelData[index];

  if (!entry.displayed) {
    alert(`
          Country: ${entry.country}
          Arrival Date: ${entry.arrivalDate}
          Departure Date: ${entry.departureDate}
          Money Spent: ${entry.money} ${entry.currency}
          Rating: ${entry.rating}
          Cities: ${entry.cities ? entry.cities.join(", ") : "None"}
        `);

    entry.displayed = true;
  }
}

function addCities(index) {
  const travelData = JSON.parse(sessionStorage.getItem("travelData")) || [];
  const entry = travelData[index];

  const city = prompt("Enter a city visited:");
  if (city) {
    if (!entry.cities) {
      entry.cities = [];
    }
    entry.cities.push(city);
    sessionStorage.setItem("travelData", JSON.stringify(travelData));

    alert("City added");
    displayTravelList();
  }
}

let editIndex = null;

function editEntry(index) {
  const travelData = JSON.parse(sessionStorage.getItem("travelData")) || [];
  const entryToEdit = travelData[index];

  document.getElementById("country").value = entryToEdit.country;
  document.getElementById("arrivalDate").value = entryToEdit.arrivalDate;
  document.getElementById("departureDate").value = entryToEdit.departureDate;
  document.getElementById("money").value = entryToEdit.money;
  document.getElementById("currency").value = entryToEdit.currency;
  document.getElementById("rating").value = entryToEdit.rating;

  document.getElementById("editForm").style.display = "block";
  editIndex = index;
}

function cancelEdit() {
  document.getElementById("editForm").style.display = "none";
  document.getElementById("editTravelForm").reset();
  editIndex = null;
}

function saveEditedEntry(event) {
  event.preventDefault();

  const editedEntry = {
    country: document.getElementById("country").value,
    arrivalDate: document.getElementById("arrivalDate").value,
    departureDate: document.getElementById("departureDate").value,
    money: document.getElementById("money").value,
    currency: document.getElementById("currency").value,
    rating: document.getElementById("rating").value,
  };

  const travelData = JSON.parse(sessionStorage.getItem("travelData")) || [];
  if (editIndex !== null && editIndex >= 0 && editIndex < travelData.length) {
    editedEntry.cities = travelData[editIndex].cities || [];
  }

  if (editIndex !== null && editIndex >= 0 && editIndex < travelData.length) {
    travelData[editIndex] = editedEntry;
    sessionStorage.setItem("travelData", JSON.stringify(travelData));
  }

  document.getElementById("editForm").style.display = "none";
  document.getElementById("editTravelForm").reset();
  editIndex = null;

  displayTravelList();
}

function deleteEntry(index) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this travel entry?"
  );

  if (confirmed) {
    const travelData = JSON.parse(sessionStorage.getItem("travelData")) || [];
    travelData.splice(index, 1);
    sessionStorage.setItem("travelData", JSON.stringify(travelData));
    displayTravelList();
  }
}

window.addEventListener("load", displayTravelList);
