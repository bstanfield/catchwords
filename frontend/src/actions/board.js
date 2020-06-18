import { hitAPI } from '../helpers/util';
import { SetGameUrl } from './game';
import * as R from 'ramda';

export const NewWords = words => ({
  type: 'NEW_WORDS',
  words,
});

export const NewTeam1Key = team1 => ({
  type: 'NEW_TEAM1_KEY',
  team1,
});

export const NewTeam2Key = team2 => ({
  type: 'NEW_TEAM2_KEY',
  team2,
});

const SetBoard = json => async dispatch => {
  dispatch(SetGameUrl(json.boardUrl));
  dispatch(NewWords(json.words));
  dispatch(NewTeam1Key(json.playerOne));
  dispatch(NewTeam2Key(json.playerTwo));
};

export const GetAndSetBoard = gameUrl => async dispatch => {
  const response = await hitAPI('get-existing-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
    board_url: gameUrl,
  });
  if (response.status === 200) {
    const json = await response.json();
    dispatch(SetBoard(R.head(json)));
  }
};

export const NewBoard = () => async dispatch => {
  const response = await hitAPI('generate-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
  });
  if (response.status === 200) {
    const json = await response.json();
    await dispatch(SetBoard(json));
    return json.boardUrl;
  }
};
