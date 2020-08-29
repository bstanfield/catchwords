const { updateTurn } = require('../queries');

exports.updateTurn = async (req, res) => {
  const { turn_count, board_url } = req.body;

  console.log('updating turn count for ', board_url, ' to count: ', turn_count);
  const result = await updateTurn(turn_count, board_url);
  console.log('updated! result: ', result);
  res.status(200).send('Success!');
};