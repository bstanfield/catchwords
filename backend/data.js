const fs = require('fs');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const rawdata = fs.readFileSync('words.json');
const words = JSON.parse(rawdata);

// ephemeral game storage
const gameBoards = {};

const getRandomWords = (total) => {
  const randomWords = shuffle(words).slice(0, total);
  return randomWords;
};

module.exports = {
  words,
  gameBoards,
  getRandomWords,
}