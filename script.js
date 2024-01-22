const shortWords = ["car", "cat", "pear", "deer", "lung", "wing"];
const mediumWords = [
  "bottle",
  "spatula",
  "hammer",
  "window",
  "circle",
  "tomato",
  "compass",
  "victory",
];
const longWords = [
  "computer",
  "watermelon",
  "pineapple",
  "wardrobe",
  "aeroplane",
  "language",
  "rectangle",
  "icecream",
];

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const gameWindow = document.querySelector(".gameWindow");
const gameOptions = document.querySelector(".options");
const alphabetBox = document.querySelector(".alphabet");

gameWindow.classList.add("hidden");

let secretWord,
  maxMistakes,
  correctGuess = 0,
  tries = 0;

const games = document.querySelectorAll(".btn");

// Treba napravit counter pokusaja i animaciju za game over

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
  hasEnded
    ? (score.innerText = `You have won the game with ${tries} mistakes. \n CONGRATULATIONS!!!`)
    : (score.innerText = `You have lost the game! \nTry to guess the word with less than ${maxMistakes} mistakes`);
  gameOverModal.appendChild(score);
  const resetGameButton = document.createElement("button");
  resetGameButton.innerText = "Try again";
  resetGameButton.addEventListener("click", () => {
    document.body.removeChild(gameOverModal);
    correctGuess = 0;
    tries = 0;
    gameOptions.classList.remove("hidden");
    gameWindow.classList.add("hidden");
    const word = document.querySelector(".wordWrapper");
    const lives = document.querySelector("#lives");
    lives.remove();
    word.remove();
  });
  gameOverModal.appendChild(resetGameButton);
};

const livesRemainingCounter = (maxMistakes, tries) => {
  const livesRemaining = document.createElement("p");
  livesRemaining.id = "lives";
  livesRemaining.innerText = `Lives remainig: ${maxMistakes}`;
  gameWindow.appendChild(livesRemaining);
};

const letterClick = (letter) => {
  if (secretWord.includes(letter)) {
    correctGuess += 1;
    const letterGuessed = document.querySelectorAll("div.letter");
    for (let i = 0; i < letterGuessed.length; i++) {
      if (letterGuessed[i].innerText === letter)
        letterGuessed[i].classList.remove("hidden");
    }
    correctGuess === secretWord.length ? gameOver(true) : null;
  } else {
    tries += 1;
    tries === maxMistakes ? gameOver(false) : null;
  }
};

const alphabetKeyboard = (alphabet) => {
  for (let i = 0; i < alphabet.length; i++) {
    const letter = document.createElement("button");
    letter.classList.add("letterPlacholder");
    letter.innerText = alphabet[i];
    letter.addEventListener("click", (e) => letterClick(e.target.innerText));
    alphabetBox.append(letter);
  }
};

games.forEach(function (button) {
  button.addEventListener("click", () => {
    if (button.id === "easy") {
      secretWord =
        shortWords[Math.floor(Math.random() * shortWords.length)].toUpperCase();
      maxMistakes = 5;
    } else if (button.id === "medium") {
      secretWord =
        mediumWords[
          Math.floor(Math.random() * shortWords.length)
        ].toUpperCase();
      maxMistakes = 7;
    } else {
      secretWord =
        longWords[Math.floor(Math.random() * shortWords.length)].toUpperCase();
      maxMistakes = 9;
    }
    gameOptions.classList.add("hidden");
    gameWindow.classList.remove("hidden");
    console.log(secretWord.length, secretWord);

    livesRemainingCounter(maxMistakes);
    console.log("AFAF");
    wordPlaceholder(secretWord);
  });
});

alphabetKeyboard(alphabet);
