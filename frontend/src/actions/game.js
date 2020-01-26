import { NewBoard } from './board';
import { ResetGuesses } from './guesses';

export const ClearGameStats = () => ({
  type: 'RESET_GAME',
});

export const SetGameUrl = gameUrl => ({
  type: 'SET_GAME_URL',
  gameUrl,
});

export const ResetGame = () => dispatch => {
  dispatch(ResetGuesses());
  dispatch(ClearGameStats());
};

export const NewGame = () => async dispatch => {
  const boardUrl = await dispatch(NewBoard());
  await dispatch(ResetGuesses());
  await dispatch(ClearGameStats());
  return boardUrl;
};

export const EndTurn = () => ({
  type: 'END_TURN',
});
