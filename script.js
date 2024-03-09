import { shortWords, mediumWords, longWords } from "./words.js";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const gameWindow = document.querySelector(".gameWindow");
const gameOptions = document.querySelector(".options");

gameWindow.classList.add("hidden");

let secretWord,
  maxMistakes,
  correctGuess = 0,
  tries = 0,
  guessedLetters = [];

const games = document.querySelectorAll(".btn");

const wordPlaceholder = (word) => {
  const wordWrapper = document.createElement("div");
  wordWrapper.classList.add("wordWrapper");
  gameWindow.appendChild(wordWrapper);
  for (let i = 0; i < word.length; i++) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letterBox");
    wordWrapper.appendChild(letterBox);
    const letter = document.createElement("div");
    letter.classList.add("letter", "hidden");
    letter.innerText = word[i];
    letterBox.appendChild(letter);
    const letterLine = document.createElement("div");
    letterBox.appendChild(letterLine);
    letterLine.classList.add("letterPlaceholder");
  }
};

const gameOver = (hasEnded) => {
  const gameOverModal = document.createElement("div");
  gameOverModal.classList.add("overlay");

  document.body.appendChild(gameOverModal);
  const title = document.createElement("h1");
  hasEnded ? (title.innerText = "You win!") : "You lose!";
  gameOverModal.appendChild(title);
  const score = document.createElement("p");
  if (hasEnded) {
    score.innerText = `You have won the game with ${tries} mistakes. \n CONGRATULATIONS!!!`;
    gameWindow.classList.add("hidden");
  } else {
    score.innerText = `You have lost the game! \nTry to guess the word with less than ${maxMistakes} mistakes`;
  }
  gameOverModal.appendChild(score);
  const resetGameButton = document.createElement("button");
  resetGameButton.innerText = "Try again";
  resetGameButton.addEventListener("click", () => {
    let alphabetBox = document.querySelector(".alphabet");
    gameWindow.removeChild(alphabetBox);
    let letterButtons = document.querySelectorAll(".letterButton");
    letterButtons.forEach((button) => (button.disabled = false));
    document.body.removeChild(gameOverModal);
    correctGuess = 0;
    tries = 0;
    guessedLetters = [];
    gameOptions.classList.remove("hidden");
    const word = document.querySelector(".wordWrapper");
    const lives = document.querySelector("#lives");
    lives.remove();
    word.remove();
  });
  gameOverModal.appendChild(resetGameButton);
};

const livesRemainingCounter = (maxMistakes, tries = 0) => {
  const livesRemaining = document.createElement("p");
  livesRemaining.id = "lives";
  livesRemaining.innerText = `Lives remainig: ${maxMistakes - tries}`;
  gameWindow.appendChild(livesRemaining);
};

const livesUpdater = (maxMistakes, tries) => {
  const livesRemaining = document.getElementById("lives");
  livesRemaining.innerText = `Lives remainig: ${maxMistakes - tries}`;
};

const letterClick = (letter, button) => {
  button.innerText === letter ? (button.disabled = true) : null;
  if (secretWord.includes(letter)) {
    let character = secretWord.split("").filter((char) => char === letter);
    guessedLetters.push(character);
    correctGuess += 1;
    const letterGuessed = document.querySelectorAll("div.letter");
    for (let i = 0; i < letterGuessed.length; i++) {
      if (letterGuessed[i].innerText === letter)
        letterGuessed[i].classList.remove("hidden");
    }

    secretWord.split("").sort().join() === guessedLetters.flat().sort().join()
      ? gameOver(true)
      : null;
  } else {
    tries += 1;
    livesUpdater(maxMistakes, tries);
    tries === maxMistakes ? gameOver(false) : null;
  }
};

const alphabetKeyboard = (alphabet) => {
  const alphabetBox = document.createElement("div");
  alphabetBox.classList.add("alphabet");
  for (let i = 0; i < alphabet.length; i++) {
    const letter = document.createElement("button");
    letter.classList.add("letterButton");
    letter.innerText = alphabet[i];
    letter.addEventListener("click", (e) =>
      letterClick(e.target.innerText, letter)
    );
    alphabetBox.append(letter);
  }
  gameWindow.appendChild(alphabetBox);
};

games.forEach(function (button) {
  button.addEventListener("click", () => {
    if (button.id === "easy") {
      secretWord =
        shortWords[Math.floor(Math.random() * shortWords.length)].toUpperCase();
      maxMistakes = 8;
    } else if (button.id === "medium") {
      secretWord =
        mediumWords[
          Math.floor(Math.random() * shortWords.length)
        ].toUpperCase();
      maxMistakes = 10;
    } else {
      secretWord =
        longWords[Math.floor(Math.random() * shortWords.length)].toUpperCase();
      maxMistakes = 12;
    }
    gameOptions.classList.add("hidden");
    gameWindow.classList.remove("hidden");
    console.log(secretWord.length, secretWord);
    livesRemainingCounter(maxMistakes);
    wordPlaceholder(secretWord);
    alphabetKeyboard(alphabet);
  });
});
