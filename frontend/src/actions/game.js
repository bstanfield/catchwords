export const ResetGame = () => ({
  type: 'RESET_GAME',
});

export const NewGame = (board, keys) => {
  console.log('starting new game in action');
  return {
    type: 'NEW_GAME',
    board,
    keys,
  };
};

export const GuessCard = cardIndex => ({
  type: 'GUESS_CARD',
  cardIndex,
});

export const EndTurn = () => ({
  type: 'END_TURN',
});
