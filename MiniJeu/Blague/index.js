const header = document.getElementById("header"); // h3
const content = document.getElementById("content"); // p
let spacePressed = false; // Pour éviter les actions répétées

// récupérer une blague avec API
function getJoke() {
  fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
      const joke = data.data.content;
      header.textContent = joke.text_head;
      content.textContent = joke.text !== "" ? joke.text : joke.text_hidden;

      // Enregistrer la blague localement
      localStorage.setItem("savedJoke", JSON.stringify(joke));
    });
}

// Vérifier s'il y a une blague enregistrée localement
const savedJoke = localStorage.getItem("savedJoke");
if (savedJoke) {
  const joke = JSON.parse(savedJoke);
  header.textContent = joke.text_head;
  content.textContent = joke.text !== "" ? joke.text : joke.text_hidden;
} else {
  getJoke();
}

// changer la blague au clic ou avec la touche espace / entrer
function changeJoke(event) {
  if (
    event.type === "click" &&
    !event.target.matches("#copyButton") // Vérifier si le clic n'est pas sur le bouton Copier
  ) {
    getJoke();
  } else if (
    (event.code === "Space" && !spacePressed) ||
    (event.code === "Enter" && !spacePressed)
  ) {
    spacePressed = true;
    getJoke();
    setTimeout(() => {
      spacePressed = false;
    }, 300); // Empêche les actions répétées
  }
}

/* bouton copier */
document.getElementById("copyButton").addEventListener("click", function () {
  const appContent = document.querySelector(".app").innerText;

  // Copie le contenu dans le presse-papiers
  navigator.clipboard.writeText(appContent);
});

document.body.addEventListener("click", changeJoke);
document.body.addEventListener("keydown", changeJoke);
