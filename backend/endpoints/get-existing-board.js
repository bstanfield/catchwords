const R = require('ramda');
const { getBoardByBoardUrl, matchPassword } = require('../queries');
const { toCamel } = require('../generalFunctions');
exports.getExistingBoard = async (req, res) => {
  const { password, board_url } = req.body;
  if (!password || !board_url) {
    res.status(422).send({ error: !password ? 'permission denied (needs pw)' : 'needs board_url' });
    return;
  }
  const validate = await matchPassword(password);
  if (R.isEmpty(validate)) {
    res.status(422).send({ error: 'permission denied (needs pw)' });
    return;
  }

  const board = await getBoardByBoardUrl(board_url);
  if (R.isEmpty(board) || R.isNil(board)) {
    res.status(404).send({ error: 'board not found' });
    return;
  }
  res.status(200).send(toCamel(board)); 
}