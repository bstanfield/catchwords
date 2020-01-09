import { combineReducers } from 'redux';
import Toaster from './toaster';
import Game from './game';

const rootReducer = combineReducers({
  toaster: Toaster,
  game: Game,
});

export default rootReducer;
