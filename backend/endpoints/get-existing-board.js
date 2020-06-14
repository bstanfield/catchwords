const R = require('ramda');
const { getBoardByBoardUrl } = require('../queries');
const { toCamel } = require('../util');
exports.getExistingBoard = async (req, res) => {
  const board_url = req.params.board;

  const board = await getBoardByBoardUrl(board_url);
  if (R.isEmpty(board) || R.isNil(board)) {
    res.status(404).send({ error: 'board not found' });
    return;
  }
  res.status(200).send(toCamel(board));
}