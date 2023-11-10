const dataLowercase = "azertyuiopqsdfghjklmwxcvbn";
const dataUppercase = dataLowercase.toUpperCase();
const dataNumbers = "0123456789";
const dataSymbols = "!@#$%^&*()_-+=[]{}|;:,.<>?";
const rangeValue = document.getElementById("password-length");
const passwordOutput = document.getElementById("password-output");
const generateButton = document.getElementById("generateButton");
const securityLevel = document.querySelector("div p");

generateButton.addEventListener("click", generatePassword);

// Sauvegarder le mdp, les critères et la longueur quand on actualise
function saveInfos(password) {
  const passwordCritere = {
    lowercase: document.getElementById("lowercase").checked,
    uppercase: document.getElementById("uppercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
    length: parseInt(rangeValue.value),
  };
  localStorage.setItem("savedPassword", password);
  localStorage.setItem("selectCritere", JSON.stringify(passwordCritere));
}

// Fonction pour générer le mdp
function generatePassword() {
  let data = [];
  let password = "";
  // Vérifier les critères sélectionnés
  if (document.getElementById("lowercase").checked) {
    data.push(...dataLowercase);
  }
  if (document.getElementById("uppercase").checked) {
    data.push(...dataUppercase);
  }
  if (document.getElementById("numbers").checked) {
    data.push(...dataNumbers);
  }
  if (document.getElementById("symbols").checked) {
    data.push(...dataSymbols);
  }

  // Vérifier si des critères sont sélectionnés
  if (data.length === 0) {
    alert("Veuillez sélectionner des critères");
    return;
  }

  // Aléatoire
  for (let i = 0; i < rangeValue.value; i++) {
    password += data[Math.floor(Math.random() * data.length)];
  }

  passwordOutput.value = password;
  saveInfos(password); // Sauvegarder dans le local storage
  passwordOutput.select();
  navigator.clipboard.writeText(passwordOutput.value); // copier le mdp dans la presse papier

  evaluateSecurityLevel(password); // appelle à la fonction pour évaluer sécurité
}

// Fonction pour évaluer le mdp en fonction de la longueur
function evaluateSecurityLevel(password) {
  const length = password.length;
  if (length < 6) {
    securityLevel.textContent = "Très faible";
    securityLevel.style.color = "red";
  } else if (length >= 6 && length < 9) {
    securityLevel.textContent = "Faible";
    securityLevel.style.color = "orange";
  } else if (length >= 9 && length < 12) {
    securityLevel.textContent = "Moyen";
    securityLevel.style.color = "yellow";
  } else if (length >= 12 && length < 20) {
    securityLevel.textContent = "Fort";
    securityLevel.style.color = "green";
  } else {
    securityLevel.textContent = "Incassable";
    securityLevel.style.color = "green";
    securityLevel.style.fontWeight = "900";
  }
}

// Recuperer les éléments stocker lors du chargement
window.addEventListener("load", function () {
  const savedPassword = localStorage.getItem("savedPassword");
  const selectCritere = JSON.parse(localStorage.getItem("selectCritere"));

  if (savedPassword) {
    passwordOutput.value = savedPassword;
    evaluateSecurityLevel(savedPassword);
  }

  if (selectCritere) {
    document.getElementById("lowercase").checked = selectCritere.lowercase;
    document.getElementById("uppercase").checked = selectCritere.uppercase;
    document.getElementById("numbers").checked = selectCritere.numbers;
    document.getElementById("symbols").checked = selectCritere.symbols;
    rangeValue.value = selectCritere.length;

    const displayPasswordLength = document.getElementById(
      "display-password-length"
    );
    displayPasswordLength.value = selectCritere.length;
    rangeValue.value = parseInt(selectCritere.length);
  }
});
