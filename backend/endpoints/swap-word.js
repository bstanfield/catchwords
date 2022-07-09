const { gameBoards, getRandomWords } = require('../data');

exports.swapWord = async (req, res) => {
  const { id, index } = req.params;
  const newWord = await getRandomWords(1);
  gameBoards[id].words[index] = newWord[0];

  res.status(200).send({
    word: newWord[0],
  });
}