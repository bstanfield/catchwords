import { combineReducers } from 'redux';
import Toaster from './toaster';
import Game from './game';
import Board from './board';
import Guesses from './guesses';

const rootReducer = combineReducers({
  toaster: Toaster,
  game: Game,
  board: Board,
  guesses: Guesses,
});

export default rootReducer;
