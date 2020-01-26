import { NewBoard } from './board';
import { ResetGuesses } from './guesses';

export const ClearGameStats = () => ({
  type: 'RESET_GAME',
});

export const ResetGame = () => dispatch => {
  dispatch(ResetGuesses());
  dispatch(ClearGameStats());
};

export const NewGame = () => dispatch => {
  dispatch(NewBoard());
  dispatch(ResetGuesses());
  dispatch(ClearGameStats());
};

export const EndTurn = () => ({
  type: 'END_TURN',
});
