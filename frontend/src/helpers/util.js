/** @jsx jsx */

import * as R from 'ramda';

export const capitalizeFirst = x => R.concat(R.toUpper(R.head(x)), R.tail(x));

export const colors = {
  primaryText: '#4A4A4A',
  lightGrayText: 'rgba(200, 200, 200, 0.9)',
  backgroundWhite: '#FcFcFc',
  backgroundShadow: '#EEECE5',
  primaryRed: '#ff4622',
  primaryGreen: '#1A3C34',
  greenButton: '#4dc156',
  progressBar: '#ffd506',
  errorRed: '#e93710',
  lightBorder: '#BCBCBC',
  veryLightGray: 'rgba(0,0,0,0.1)',
  neutralCard: '#A8BAC3',
  correctCard: '#61ea44',
  assassinCard: '#E14938'
};

// General helper fns
export const hitAPIEndpoint = (method, endpoint, body) => {
  const response = fetch(`http://localhost:3333/api/${endpoint}`, {
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response;
};

export const getAllBoards = async () => {
  const boards = await hitAPIEndpoint('get', `get-boards`);
  return boards;
};

export const findCorrectGuesses = (teamBoard, teamGuesses) => {
  return teamGuesses.filter(guess => teamBoard[guess] === 1);
};

export const findIncorrectGuesses = (teamBoard, teamGuesses) => {
  const incorrect = teamGuesses.filter(guess => teamBoard[guess] === 2);
  return incorrect;
};
