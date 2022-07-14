const { getValidWords, sqrtWordWeight } = require("./db");

Array.prototype.remove = function(value) {
  for (var i = this.length; i--; )
  {
      if (this[i] === value) {
          this.splice(i, 1);
      }
  }
}

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const getArrayOfWordsByWeight = (wordObjs) => {
  let words = [];
  wordObjs.map(obj => {
    let iterations = obj.weight;
    while (iterations > 0) {
      words.push(obj.word);
      iterations--;
    }
  })
  return words;
}

const getRandomUniqueWords = (wordsByWeight, total) => {
  // start with array of all words, with some words appearing multiple times
  // (dictated by weight)
  let remainingWords = wordsByWeight;
  // populate selectedWords with length = total, with each position in arr 
  // a unique word
  let selectedWords = [];
  while (total > 0) {
    // Each time a word is selected randomly, remove duplicates of
    // that word from remainingWords and push that word to selectedWords
    const word = shuffle(remainingWords)[0];
    selectedWords.push(word);
    remainingWords.remove(word);
    total--;
  }
  selectedWords.map(word => sqrtWordWeight(word));
  return selectedWords;
}

const getRandomWords = async (total) => {
  const words = await getValidWords();
  const arrayOfWordsByWeight = getArrayOfWordsByWeight(words);
  const randomWords = getRandomUniqueWords(arrayOfWordsByWeight, total);
  return randomWords;
};

module.exports = {
  getRandomWords,
}