const { getBoards } = require('../db');

exports.getBoards = async (req, res) => {
  const boards = await getBoards();

  res.status(200).send(boards);
}