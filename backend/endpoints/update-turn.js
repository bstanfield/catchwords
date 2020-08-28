const { updateTurn } = require('../queries');

exports.updateTurn = async (req, res) => {
  console.log('updating turn... ');
  const { turn_count, board_url } = req.body;

  await updateTurn(turn_count, board_url);
  res.status(200).send('Success!');
};