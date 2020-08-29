const { updateGuessesArr } = require('../queries');

exports.updateGuesses = async (req, res) => {
  const { team, guesses, board_url } = req.body;
  await updateGuessesArr(team, board_url, guesses);
  res.status(200).send('Success!');
};