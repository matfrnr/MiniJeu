const countriesContainer = document.querySelector(".countries-container"); // Conteneur des pays
const btnSort = document.querySelectorAll(".btnSort"); // Boutons de tri
let countriesData = []; //données des pays
let sortMethod = "maxToMin"; // tri par défaut

// requete avec une API pour récupérer les pays
async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json()) // Convertir en JSON
    .then((data) => (countriesData = data)); // Stocke les infos dans le tableau

  countriesDisplay();
}

// afficher pays sur la page
function countriesDisplay() {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) // Trier
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population; // decroissant
      } else if (sortMethod === "minToMax") {
        return a.population - b.population; //croissant
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        ); // Trie alphabétique
      }
    })
    .slice(0, inputRange.value) // nombre de pays selon curseur
    .map(
      (country) =>
        // Code HTML pour afficher les pays
        `
          <div class="card">
            <img src=${country.flags.svg} alt="drapeau ${
          country.translations.fra.common
        }" > 
            <h2>${country.translations.fra.common}</h2>
            <h4>${country.capital}</h4>
            <p>Population : ${country.population.toLocaleString()}</p>
          </div>
        `
    )
    .join("");
}

// chargement de la page
window.addEventListener("load", fetchCountries);

// saisie champ input
inputSearch.addEventListener("input", countriesDisplay);

// en cas de changement du nombre de pays
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

// boutons de tri
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
