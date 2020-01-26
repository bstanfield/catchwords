import { hitAPI } from '../helpers/util';

export const NewWords = words => ({
  type: 'NEW_WORDS',
  words,
});

export const NewTeam1Key = team1Key => ({
  type: 'NEW_TEAM1_KEY',
  team1: team1Key,
});

export const NewTeam2Key = team2Key => ({
  type: 'NEW_TEAM2_KEY',
  team2: team2Key,
});

export const NewGame = () => async dispatch => {
  const response = await hitAPI('generate-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
  });
  if (response.status === 200) {
    const json = await response.json();
    dispatch(NewWords(json.words));
    dispatch(NewTeam1Key(json.playerOne));
    dispatch(NewTeam2Key(json.playerTwo));
  }
};
