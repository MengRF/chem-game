const questionText = document.getElementById("question");
const buttonContainer = document.getElementById("buttons");
const answerDisplay = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");
const timerDisplay = document.getElementById("timer");
const welcomeText = document.getElementById("welcome");

const totalGameTime = 180;
let timeLeft = totalGameTime;
let countdownInterval;

let playerAnswer = "";
let currentQuestion = null;

const questions = [
  { name: "Water", answer: "H2O" },
  { name: "Sodium hydroxide", answer: "NaOH" },
  { name: "Potassium hydroxide", answer: "KOH" },
  { name: "Barium hydroxide", answer: "Ba(OH)2" },
  { name: "Magnesium hydroxide", answer: "Mg(OH)2" },
  { name: "Sodium Bromide", answer: "NaBr" },
  { name: "Potassium Bromide", answer: "KBr" },
  { name: "Sodium Iodide", answer: "NaI" },
  { name: "Potassium Iodide", answer: "KI" },
  { name: "Potassium fluoride", answer: "KF" },
  { name: "Sodium fluoride", answer: "NaF" },
  { name: "Aluminium oxide", answer: "Al2O3" },
  { name: "Silver nitrate", answer: "AgNO3" },
  { name: "Ammonia", answer: "NH3" },
  { name: "Carbon dioxide", answer: "CO2" },
  { name: "Methane", answer: "CH4" },
  { name: "Sodium chloride", answer: "NaCl" },
  { name: "Sulfuric acid", answer: "H2SO4" },
  { name: "Calcium hydroxide", answer: "Ca(OH)2" }
];

const elements = [
  ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
  ["Li", "Be", "", "", "", "", "", "", "", "", "", "", "B", "C", "N", "O", "F", "Ne"],
  ["Na", "Mg", "", "", "", "", "", "", "", "", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
  ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
  ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
  ["Cs", "Ba", "", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"]
];

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const brackets = ["(", ")"];

function createButtons() {
  elements.flat().forEach(symbol => {
    const btn = document.createElement("button");
    if (symbol === "") {
      btn.className = "empty-button";
    } else {
      btn.textContent = symbol;
      btn.onclick = () => {
        playerAnswer += symbol;
        answerDisplay.innerHTML = formatChemicalFormula(playerAnswer);
      };
    }
    buttonContainer.appendChild(btn);
  });

  numbers.forEach(n => {
    const btn = document.createElement("button");
    btn.textContent = n;
    btn.onclick = () => {
      playerAnswer += n;
      answerDisplay.innerHTML = formatChemicalFormula(playerAnswer);
    };
    buttonContainer.appendChild(btn);
  });

  brackets.forEach(b => {
    const btn = document.createElement("button");
    btn.textContent = b;
    btn.onclick = () => {
      playerAnswer += b;
      answerDisplay.innerHTML = formatChemicalFormula(playerAnswer);
    };
    buttonContainer.appendChild(btn);
  });
}

function formatChemicalFormula(formula) {
  return formula.replace(/([A-Za-z)(]+)(\d+)/g, (_, sym, num) => `${sym}<sub>${num}</sub>`);
}

function showQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = q;
  questionText.textContent = `Question: ${q.name}`;
  playerAnswer = "";
  answerDisplay.innerHTML = "";
  feedback.innerHTML = "";
}

function updateTimer() {
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
}

function startTimer() {
  updateTimer();
  countdownInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      questionText.textContent = "⏰ Time's up!";
      feedback.textContent = "";
    }
  }, 1000);
}

submitButton.onclick = () => {
  if (!currentQuestion) return;
  if (playerAnswer === currentQuestion.answer) {
    feedback.innerHTML = `✅ Correct! ${formatChemicalFormula(playerAnswer)}`;
  } else {
    feedback.innerHTML = `❌ Wrong! Correct answer: ${formatChemicalFormula(currentQuestion.answer)}`;
  }
  setTimeout(showQuestion, 1000);
};

clearButton.onclick = () => {
  playerAnswer = "";
  answerDisplay.innerHTML = "";
  feedback.innerHTML = "";
};

window.onload = () => {
  const name = prompt("请输入你的名字：") || "Player";
  welcomeText.textContent = `Welcome, ${name}!`;
  createButtons();
  showQuestion();
  startTimer();
};