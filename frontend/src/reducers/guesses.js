import * as R from 'ramda';

const initialState = {
  team1: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  team2: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
};

const GuessCard = (state, action) => {
  const stateClone = Object.assign({}, state);
  const teamGuessesClone = [...stateClone[action.teamTurn]];
  const teamKeyClone = [...action.board[action.teamTurn]];
  teamGuessesClone[action.cardIndex] = teamKeyClone[action.cardIndex];
  // if (stateClone.guesses[action.teamTurn][action.cardIndex] === 2) {
  //   return R.assoc(stateClone.gameOver, true, stateClone);
  // }
  return R.assoc(action.teamTurn, teamGuessesClone, stateClone);
};

const ResetGuesses = (state, action) => {
  const emptyArrayOf25 = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  const stateClone = Object.assign({}, state);
  const stateClone1 = R.assoc('team1', emptyArrayOf25, stateClone);
  const stateClone2 = R.assoc('team2', emptyArrayOf25, stateClone1);
  return stateClone2;
};

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'GUESS_CARD':
      return GuessCard(state, action);
    case 'RESET_GUESSES':
      return ResetGuesses(state, action);
    default:
      return state;
  }
};
