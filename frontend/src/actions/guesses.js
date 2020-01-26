export const GuessCard = (cardIndex, teamTurn, teamKey) => ({
  type: 'GUESS_CARD',
  cardIndex,
  teamTurn,
  teamKey,
});

export const ResetGuesses = () => ({
  type: 'RESET_GUESSES',
});
