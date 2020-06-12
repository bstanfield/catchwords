const R = require('ramda');
const { getBoardByBoardUrl, getRandomWords, updateBoardWord, matchPassword } = require('../queries');
const { toCamel } = require('../generalFunctions');
exports.swapWordOnExistingBoard = async (req, res) => {
  const { password, board_url, index } = req.body;
  // VALIDATION //
  if (!password || !board_url) {
    return res.status(422).send({ error: !password ? 'permission denied (needs pw)' : 'needs board_url' });
  }
  const validate = await matchPassword(password);
  if (R.isEmpty(validate)) {
    return res.status(422).send({ error: 'permission denied (needs pw)' });
  }
  // END VALIDATION //
  if (!index) {
    return res.status(422).send({ error: 'needs index' });
  }

  const board = await getBoardByBoardUrl(board_url);
  if (R.isEmpty(board) || R.isNil(board)) {
    return res.status(404).send({ error: 'board not found' });
  }

  const { words } = board[0];
  const randomWords = await getRandomWords();
  const wordToAdd = randomWords.rows[0].name;
  words.splice(index, 1, wordToAdd);
  await updateBoardWord(words, board_url);
  res.status(200).send({
    board: toCamel(board),
    word: wordToAdd,
  });
}