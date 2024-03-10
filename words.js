async function getWords() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const words = await response.json();
  for (const word of words) {
    if (word.length <= 5) {
      shortWords.push(word);
    } else if (word.length > 5 && word.length <= 7) {
      mediumWords.push(word);
    } else {
      longWords.push(word);
    }
  }
}

getWords();

const shortWords = [];
const mediumWords = [];
const longWords = [];

export { shortWords, mediumWords, longWords };
