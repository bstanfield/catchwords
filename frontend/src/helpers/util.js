/** @jsx jsx */

import * as R from 'ramda';

export const capitalizeFirst = (x) => R.concat(R.toUpper(R.head(x)), R.tail(x));

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
  assassinCard: '#E14938',
};

// General helper fns
export const hitAPIEndpoint = (method, endpoint, body) => {
  const response = fetch(`http://localhost:3333/api/${endpoint}`, {
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const getBoard = async (url) => {
  const board = await hitAPIEndpoint('get', `get-existing-board/${url}`);
  return board;
};

// PlayerBoard helper fns
export const triggerModal = (setShowModal) => {
  setShowModal(true);
  setTimeout(() => {
    setShowModal(false);
  }, 3000);
};

export const replaceWord = async (index, url, board, state) => {
  const response = await hitAPIEndpoint('get', `swap-word/${url}/${index}`);
  const updatedBoard = await response.json();
  const newWord = updatedBoard.word;
  board.splice(index, 1, newWord);
  state.setBoard(board);
  state.triggerRefreshCard(state.refreshCard + 1);
};

export const attemptGuess = (index, state, modifiers) => {
  const tileType =
    state.turn === 'red' ? state.redTeam[index] : state.blueTeam[index];
  if (tileType === 1) {
    const newArr = R.concat(state.correctGuesses, [index]);
    modifiers.setCorrectGuesses(newArr);
  }

  if (state.turn === 'red') {
    const newArr = R.concat(state.redGuesses, [index]);
    modifiers.setRedGuesses(newArr);
    if (tileType === 1) {
      const newArr = R.concat(state.correctGuessesByBlueTeam, [index]);
      modifiers.setCorrectGuessesByBlueTeam(newArr);
    }
  } else {
    const newArr = R.concat(state.blueGuesses, [index]);
    modifiers.setBlueGuesses(newArr);
    if (tileType === 1) {
      const newArr = R.concat(state.correctGuessesByRedTeam, [index]);
      modifiers.setCorrectGuessesByRedTeam(newArr);
    }
  }
};
