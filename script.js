const questionText = document.getElementById("question");
const buttonContainer = document.getElementById("buttons");
const answerDisplay = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");
const timerDisplay = document.getElementById("timer");
const welcomeText = document.getElementById("welcome");

const leaderboardDiv = document.getElementById("leaderboard");
const rankingList = document.getElementById("rankingList");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const retryWrongBtn = document.getElementById("retryWrongBtn");
const restartBtn = document.getElementById("restartBtn");
const clearBoardBtn = document.getElementById("clearBoardBtn");

const totalGameTime = 120;
let timeLeft = totalGameTime;
let countdownInterval;

let username = "";
let playerAnswer = "";
let currentQuestion = null;
let correctCount = 0;
let totalCount = 0;

let correctRecords = [];
let incorrectRecords = [];

const questions = [
  { name: "Hydrogen", answer: "H" },
  { name: "Helium", answer: "He" },
  { name: "Lithium", answer: "Li" },
  { name: "Beryllium", answer: "Be" },
  { name: "Boron", answer: "B" },
  { name: "Carbon", answer: "C" },
  { name: "Nitrogen", answer: "N" },
  { name: "Oxygen", answer: "O" },
  { name: "Fluorine", answer: "F" },
  { name: "Neon", answer: "Ne" },
  { name: "Sodium", answer: "Na" },
  { name: "Magnesium", answer: "Mg" },
  { name: "Aluminium", answer: "Al" },
  { name: "Silicon", answer: "Si" },
  { name: "Phosphorus", answer: "P" },
  { name: "Sulfur", answer: "S" },
  { name: "Chlorine", answer: "Cl" },
  { name: "Argon", answer: "Ar" },
  { name: "Potassium", answer: "K" },
  { name: "Calcium", answer: "Ca" },
  { name: "Iron", answer: "Fe" },
  { name: "Copper", answer: "Cu" },
  { name: "Gold", answer: "Au" },
  { name: "Silver", answer: "Ag" },
  { name: "Zinc", answer: "Zn" },
  { name: "Water", answer: "H2O" },
  { name: "Hydrochloric acid", answer: "HCl" },
  { name: "Sulfuric acid", answer: "H2SO4" },
  { name: "Nitric acid", answer: "HNO3" },
  { name: "Ammonia", answer: "NH3" },
  { name: "Ammonium chloride", answer: "NH4Cl" },
  { name: "Sodium hydroxide", answer: "NaOH" },
  { name: "Potassium hydroxide", answer: "KOH" },
  { name: "Calcium hydroxide", answer: "Ca(OH)2" },
  { name: "Barium hydroxide", answer: "Ba(OH)2" },
  { name: "Magnesium hydroxide", answer: "Mg(OH)2" },
  { name: "Copper(II) sulfate", answer: "CuSO4" },
  { name: "Zinc sulfate", answer: "ZnSO4" },
  { name: "Iron(III) chloride", answer: "FeCl3" },
  { name: "Iron(II) sulfate", answer: "FeSO4" },
  { name: "Silver nitrate", answer: "AgNO3" },
  { name: "Sodium carbonate", answer: "Na2CO3" },
  { name: "Calcium carbonate", answer: "CaCO3" },
  { name: "Copper(II) oxide", answer: "CuO" },
  { name: "Magnesium oxide", answer: "MgO" },
  { name: "Carbon dioxide", answer: "CO2" },
  { name: "Methane", answer: "CH4" },
  { name: "Hydrogen gas", answer: "H2" },
  { name: "Oxygen gas", answer: "O2" },
  { name: "Chlorine gas", answer: "Cl2" },
  { name: "Barium sulfate", answer: "BaSO4" },
  { name: "Sodium bromide", answer: "NaBr" },
  { name: "Sodium iodide", answer: "NaI" },
  { name: "Sodium fluoride", answer: "NaF" },
  { name: "Aluminium oxide", answer: "Al2O3" },
  { name: "Sodium chloride", answer: "NaCl" },
  { name: "Hydrogen chloride acid", answer: "HCl" }
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
  buttonContainer.innerHTML = "";
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
      endGame();
    }
  }, 1000);
}

submitButton.onclick = () => {
  if (!currentQuestion) return;
  totalCount++;

  if (playerAnswer === currentQuestion.answer) {
    correctCount++;
    feedback.innerHTML = `✅ Correct! ${formatChemicalFormula(playerAnswer)}`;
    correctRecords.push({ question: currentQuestion.name, answer: currentQuestion.answer });
  } else {
    feedback.innerHTML = `❌ Wrong! Correct answer: ${formatChemicalFormula(currentQuestion.answer)}`;
    incorrectRecords.push({
      question: currentQuestion.name,
      correctAnswer: currentQuestion.answer,
      userAnswer: playerAnswer
    });
  }

  setTimeout(showQuestion, 1000);
};

clearButton.onclick = () => {
  playerAnswer = "";
  answerDisplay.innerHTML = "";
  feedback.innerHTML = "";
};

function endGame() {
  questionText.textContent = "⏰ Time's up!";
  buttonContainer.innerHTML = "";

  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  // 排行榜记录
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({
    name: username,
    correct: correctCount,
    total: totalCount,
    score: accuracy
  });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));

  leaderboardDiv.style.display = "block";
  rankingList.innerHTML = leaderboard.map(entry =>
    `<li>${entry.name} – ${entry.correct}/${entry.total} correct (${entry.score}%)</li>`
  ).join("");

  // 成绩报告显示
  document.getElementById("report").style.display = "block";
  document.getElementById("summary").textContent =
    `You answered ${correctCount} out of ${totalCount} correctly. Accuracy: ${accuracy}%`;

  const correctList = document.getElementById("correctList");
  const incorrectList = document.getElementById("incorrectList");
  correctList.innerHTML = "";
  incorrectList.innerHTML = "";

  correctRecords.forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `${entry.question} → ${formatChemicalFormula(entry.answer)}`;
    correctList.appendChild(li);
  });

  incorrectRecords.forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `${entry.question} → ❌ Your answer: ${formatChemicalFormula(entry.userAnswer)} | ✅ Correct: ${formatChemicalFormula(entry.correctAnswer)}`;
    incorrectList.appendChild(li);
  });

  exportPdfBtn.style.display = "inline-block";
  retryWrongBtn.style.display = "inline-block";
  restartBtn.style.display = "inline-block";
  clearBoardBtn.style.display = "inline-block";
}

exportPdfBtn.onclick = () => {
  const element = document.getElementById("report");

  const opt = {
    margin: 0.5,
    filename: `${username}_ChemGame_Report.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'], before: '#correctList, #incorrectList' }
  };

  html2pdf().set(opt).from(element).save();
};

retryWrongBtn.onclick = () => {
  if (incorrectRecords.length === 0) {
    alert("🎉 没有错题，太棒啦！");
    return;
  }

  questions.length = 0;
  incorrectRecords.forEach(entry => {
    questions.push({
      name: entry.question,
      answer: entry.correctAnswer
    });
  });

  correctCount = 0;
  totalCount = 0;
  correctRecords = [];
  incorrectRecords = [];
  timeLeft = totalGameTime;

  leaderboardDiv.style.display = "none";
  document.getElementById("report").style.display = "none";
  exportPdfBtn.style.display = "none";
  retryWrongBtn.style.display = "none";
  restartBtn.style.display = "none";
  clearBoardBtn.style.display = "none";

  createButtons();
  showQuestion();
  startTimer();
};

restartBtn.onclick = () => location.reload();

clearBoardBtn.onclick = () => {
  localStorage.removeItem("leaderboard");
  rankingList.innerHTML = "";
  feedback.innerHTML = "✅ Leaderboard cleared!";
};

window.onload = () => {
  username = prompt("请输入你的名字：") || "Player";
  welcomeText.textContent = `Welcome, ${username}!`;
  createButtons();
  showQuestion();
  startTimer();
};

document.getElementById("printPdfBtn").onclick = () => {
  window.print();  // 调用浏览器原生打印功能
};
