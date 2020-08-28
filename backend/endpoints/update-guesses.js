const { updateGuessesArr } = require('../queries');

exports.updateGuesses = async (req, res) => {
  console.log('receiving request!')
  const { team, guesses, board_url } = req.body;
  // hack
  let player = 1;
  if (team === 'blue') {
    player = 2;
  }

  await updateGuessesArr(player, board_url, guesses);
  res.status(200).send('Success!');
};