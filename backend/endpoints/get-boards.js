const R = require('ramda');
const { gameBoards } = require('../data');

exports.getBoards = async (req, res) => {
  res.status(200).send(gameBoards);
}