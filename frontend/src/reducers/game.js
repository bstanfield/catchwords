import * as R from 'ramda';

const initialState = {
  started: false,
  gameOver: false,
  teamTurn: 'team1',
  startTime: '',
};

// 0 is neutral
// 1 is correct
// 2 is assassin

// TODO: Basically this is returning an object that's too similar to the one in play, so states are recognized as the same
const NewGame = (state, action) => {
  return Object.assign({}, initialState);
};

// Log guess
// if neutral, end turn
// if green, add point
// if assassin, end game

const EndTurn = (state, action) => {
  const stateClone = Object.assign({}, state);
  // map over guess array...
  stateClone.teamTurn = stateClone.teamTurn === 'team1' ? 'team2' : 'team1';

  // if game ends, end time
  return stateClone;
};

// TODO: Need a way to restart game from an oops page??
export default function(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'NEW_GAME':
      return NewGame(state, action);
    case 'END_TURN':
      return EndTurn(state, action);
    case 'RESET_GAME':
      return { ...initialState };
    default:
      return state;
  }
}
