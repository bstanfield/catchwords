import { NewBoard } from './board';
import { ResetGuesses } from './guesses';

export const NewGame = () => dispatch => {
  dispatch(NewBoard());
  dispatch(ResetGuesses());
  return {
    type: 'NEW_GAME',
  };
};

export const ResetGame = () => dispatch => {
  dispatch(NewGame());
  return {
    type: 'RESET_GAME',
  };
};

export const EndTurn = () => ({
  type: 'END_TURN',
});
