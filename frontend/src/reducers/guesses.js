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
  stateClone.guesses[stateClone.teamTurn][action.cardIndex] =
    stateClone.keys[stateClone.teamTurn][action.cardIndex];
  if (stateClone.guesses[stateClone.teamTurn][action.cardIndex] === 2) {
    return R.assoc(stateClone.gameOver, true, stateClone);
  }
  return stateClone;
};

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'GUESS_CARD':
      return GuessCard(state, action);
    case 'RESET_GUESSES':
      return { ...initialState };
    default:
      return state;
  }
};
