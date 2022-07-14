const { getBoard } = require('../db');

exports.getExistingBoard = async (req, res) => {
  const id = req.params.board;
  const board = await getBoard(id);

  res.status(200).send(JSON.parse(board[0]));
}