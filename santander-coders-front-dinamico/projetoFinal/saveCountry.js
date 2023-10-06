const travelData = [];

function handleSubmit(event) {
  event.preventDefault();

  const country = document.getElementById("country").value;
  const arrivalDate = document.getElementById("arrivalDate").value;
  const departureDate = document.getElementById("departureDate").value;
  const money = parseFloat(document.getElementById("money").value);
  const currency = document.getElementById("currency").value;
  const rating = parseInt(document.getElementById("rating").value);

  const travelEntry = {
    country,
    arrivalDate,
    departureDate,
    money,
    currency,
    rating,
  };

  const existingData = JSON.parse(sessionStorage.getItem("travelData")) || [];

  existingData.push(travelEntry);

  sessionStorage.setItem("travelData", JSON.stringify(existingData));

  document.getElementById("country").value = "";
  document.getElementById("arrivalDate").value = "";
  document.getElementById("departureDate").value = "";
  document.getElementById("money").value = "";
  document.getElementById("rating").value = "";

  console.log(existingData);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
