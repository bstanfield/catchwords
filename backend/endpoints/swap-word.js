const R = require('ramda');
const { getBoardByBoardUrl, getRandomWords, updateBoardWord } = require('../queries');
const { toCamel } = require('../util');
exports.swapWord = async (req, res) => {
  const { board, index } = req.params;
  if (!index) {
    return res.status(422).send({ error: 'needs index' });
  }

  const retrievedBoard = await getBoardByBoardUrl(board);
  if (R.isEmpty(retrievedBoard) || R.isNil(retrievedBoard)) {
    return res.status(404).send({ error: 'board not found' });
  }

  const { words } = retrievedBoard[0];
  const randomWords = await getRandomWords();
  const wordToAdd = randomWords.rows[0].name;
  words.splice(index, 1, wordToAdd);
  await updateBoardWord(words, retrievedBoard);
  res.status(200).send({
    board: toCamel(retrievedBoard),
    word: wordToAdd,
  });
}