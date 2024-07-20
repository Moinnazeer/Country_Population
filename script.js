let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = `Population: ${country.population}`;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl);
}

function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let each of countriesList) {
        if (each.name.toLowerCase().includes(searchInputVal.toLowerCase())) {
            createAndAppendCountry(each);
        }
    }
}

function getCountries() {
    spinnerEl.classList.remove('d-none');
    fetch('https://apis.ccbp.in/countries-data')
        .then(response => response.json())
        .then(data => {
            spinnerEl.classList.add('d-none');
            countriesList = data;
            displaySearchResults();
        });
}

getCountries();

searchInputEl.addEventListener('keyup', function(event) {
    searchInputVal = event.target.value;
    displaySearchResults();
});
