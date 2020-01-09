export const NewGame = view => ({
  type: 'NEW_GAME',
  board,
  keys,
});

export const EndTurn = guessArray => ({
  type: 'END_TURN',
  guessArray,
});
