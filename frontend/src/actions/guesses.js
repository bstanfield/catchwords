export const GuessCard = (cardIndex, teamTurn, board) => ({
  type: 'GUESS_CARD',
  cardIndex,
  teamTurn,
  board,
});

export const ResetGuesses = () => ({
  type: 'RESET_GUESSES',
});
