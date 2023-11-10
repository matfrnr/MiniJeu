// Recup HTML
const counterDisplay = document.querySelector("h3");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timerDisplay");

let counter = 0; // score
let seconds = 20; // chrono
let timerInterval;
const bubbleInterval = 500; // Générer une bulle toutes les 1/2s
let bubbleGeneration;
let gameInProgress = false; // savoir si une partie est en cours (reset)

// Initialise rle jeu
const initGame = () => {
  // vérifier si une partie est en cours
  if (gameInProgress) {
    return;
  }
  gameInProgress = true; // Mettre à jour l'état
  counter = 0; // Remettre le score à 0
  counterDisplay.textContent = counter;
  seconds = 20; // Remettre le chrono à 20 secondes
  startTimer(); // Démarrer le chrono
  bubbleGeneration = setInterval(bubbleMaker, bubbleInterval); // Démarrer la génération de bulles
  displayLastScore(); // Afficher le dernier score au chargement de la page
};

// Arrêter le jeu
const stopGame = () => {
  gameInProgress = false; // Mettre à jour l'état
  clearInterval(timerInterval);
  stopBubbles(); // Arrêter la génération de bulle
};

// Enregistrer le dernier score
const saveLastScore = () => {
  localStorage.setItem("lastScore", counter);
};

// Afficher le dernier score
const displayLastScore = () => {
  const lastScore = localStorage.getItem("lastScore");
  // vérifier qu'il existe
  if (lastScore !== null) {
    scoreDisplay.textContent = `Dernier score : ${lastScore}`;
  }
};

// fonction pour arréter la génération
const stopBubbles = () => {
  clearInterval(bubbleGeneration);
};

// Générer une bulle
const bubbleMaker = () => {
  // Créer la bulle
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  // Générer une taille aléatoire
  const size = Math.random() * 200 + 100 + "px";
  bubble.style.height = size;
  bubble.style.width = size;

  // Générer une position aléatoire
  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  // Mouvement random
  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  // Eclater la bulle
  bubble.addEventListener("click", () => {
    counter++; // augmenter le score
    counterDisplay.textContent = counter;
    bubble.remove(); // supprimer la bulle
  });

  // Supprimer la bulle automatiquement
  setTimeout(() => {
    bubble.remove();
  }, 8000);
};

// Démarrer le chrono
const startTimer = () => {
  timerInterval = setInterval(() => {
    // Vérifier si le chrono est terminé
    if (seconds > 0) {
      seconds--;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const displaySeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
      timerDisplay.textContent = ` ${displayMinutes}:${displaySeconds}`;
    } else {
      // Si le chrono est terminé
      clearInterval(timerInterval);
      timerDisplay.textContent = "Temps écoulé";
      saveLastScore(); // Enregistrer le dernier score
      setTimeout(() => {
        timerDisplay.textContent = "Cliquez pour recommencer";
        // Relancer le jeu
        timerDisplay.addEventListener("click", () => {
          initGame();
          timerDisplay.removeEventListener("click", null);
        });
      }, 1000);
      stopGame(); // arreter la partie
    }
  }, 1000);
};

// Démarrer le jeu
initGame();
