import { hitAPI } from '../helpers/util';

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

export const NewBoard = () => async dispatch => {
  const response = await hitAPI('generate-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log('newBoard', json)
    dispatch(NewWords(json.words));
    dispatch(NewTeam1Key(json.playerOne));
    dispatch(NewTeam2Key(json.playerTwo));
  }
};
