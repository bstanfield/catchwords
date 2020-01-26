import * as R from 'ramda';

const initialState = {
  team1: [
    1,
    0,
    2,
    1,
    1,
    0,
    1,
    1,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    2,
    1,
    1,
  ],
  team2: [
    0,
    1,
    2,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    1,
    1,
    0,
    1,
    2,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
  ],
  words: [
    'apple',
    'horse',
    'dog',
    'russia',
    'juice',
    'rum',
    'coke',
    'soda',
    'oranges',
    'pear',
    'persimmon',
    'socks',
    'blankets',
    'pets',
    'domestic',
    'bonsai',
    'european',
    'knead',
    'eat',
    'row',
    'rock',
    'marmalade',
    'biergarten',
    'teacher',
    'university',
  ],
};

const NewTeam1Key = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.team1 = action.team1;
  return stateClone;
};

const NewTeam2Key = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.team2 = action.team2;
  return stateClone;
};

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'NEW_TEAM1_KEY':
      return NewTeam1Key(action, state);
    case 'NEW_TEAM2_KEY':
      return NewTeam2Key(action, state);
    case 'NEW_WORDS':
      return R.assoc('words', action.words, state);
    case 'RESET_WORDS':
      return { ...initialState };
    default:
      return state;
  }
};
