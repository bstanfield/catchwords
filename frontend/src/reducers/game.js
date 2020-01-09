import * as R from 'ramda';

const initialState = {
  started: false,
  teamTurn: 'team1',
  startTime: '',
  board: [
    'apple',
    'horse',
    'dog',
    'russia',
    'juice',
    'vodka',
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
  keys: {
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
  },
  guesses: {
    team1: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ],
    team2: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ],
  },
};

// 0 is neutral
// 1 is correct
// 2 is assassin

const NewGame = (state, action) => {
  const stateClone = Object.assign({}, state);
  // somehow start game. idk
  R.assoc('started', true, state);
  return stateClone;
};

// Log guess
// if neutral, end turn
// if green, add point
// if assassin, end game

const EndTurn = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.guesses = R.assoc(stateClone.teamTurn, action.guessArray);
  stateClone.teamTurn = stateClone.teamTurn === 'team1' ? 'team2' : 'team1';
  return stateClone;
};

export default function(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'NEW_GAME':
      return NewGame(state, action);
    case 'END_TURN':
      return EndTurn(state, action);
    default:
      return state;
  }
}
