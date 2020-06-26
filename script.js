const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "actually",
  "false",
  "plethora",
  "superhuman",
  "miasma",
  "dark",
  "filter",
  "universal",
  "jupiter",
  "sun",
  "moon",
  "electric",
  "spider-man",
  "soul",
  "wrangler",
  "pomsky",
  "independent",
  "batman",
  "freedom",
  "woolgathering",
  "sarang",
  "allegiant",
  "gauche",
  "obviate",
  "ennui",
  "culturati",
  "werewolf",
  "hive-mind",
  "laconic",
  "stoic",
  "inspissate",
  "legerity",
  "oneiric",
  "eldritch",
  "turpitude",
  "tyrant",
  "furphy",
  "natter",
  "knight",
  "castle",
  "sheep",
  "skeleton",
  "vampire",
  "dracula",
  "frankenstein",
  "fire-demon",
  "t-virus",
  "wolfs-bane",
  "belmont",
  "alucard",
  "medusa",
  "death",
  "minotaur",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in LS or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update score function
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// end game / show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time Ran Out!</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// event listeners

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear the text field
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
