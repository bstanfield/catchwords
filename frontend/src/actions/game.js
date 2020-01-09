export const NewGame = (board, keys) => ({
  type: 'NEW_GAME',
  board,
  keys,
});

export const GuessCard = cardIndex => ({
  type: 'GUESS_CARD',
  cardIndex,
});

export const EndTurn = () => ({
  type: 'END_TURN',
});
