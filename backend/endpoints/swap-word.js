const { gameBoards, getRandomWords } = require('../data');

exports.swapWord = async (req, res) => {
  const { id, index } = req.params;
  const newWord = getRandomWords(1)[0];
  gameBoards[id].words[index] = newWord;

  res.status(200).send({
    word: newWord,
  });
}