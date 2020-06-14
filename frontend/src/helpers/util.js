/** @jsx jsx */

import * as R from 'ramda';

export const capitalizeFirst = x => R.concat(R.toUpper(R.head(x)), R.tail(x));

export const colors = {
  primaryText: '#4A4A4A',
  lightGrayText: 'rgba(200, 200, 200, 0.9)',
  // primaryText: '#333333',
  backgroundWhite: '#FcFcFc',
  backgroundShadow: '#EEECE5',
  primaryRed: '#ff4622',
  // backgroundWhite: 'rgb(245, 245, 245)',
  primaryGreen: '#1A3C34',
  greenButton: '#4dc156',
  highlightOrange: '#F79F22',
  hoverOrange: '#DD7812',
  buttonGlowOrange: '#F2C357',
  progressBar: '#ffd506',
  errorRed: '#e93710',
  lightBorder: '#BCBCBC',
  veryLightGray: 'rgba(0,0,0,0.1)',
  neutralCard: '#A8BAC3',
  correctCard: '#61ea44',
  assassinCard: '#E14938',
};

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

// Helper fns
export const triggerModal = (setShowModal) => {
  setShowModal(true);
  setTimeout(() => {
    setShowModal(false);
  }, 3000);
};

export const replaceWord = async (index, url, board, state) => {
  const response = await hitAPIEndpoint('get', `swap-word/${url}/${index}`);
  const updatedBoard = await (response.json());
  const newWord = updatedBoard.word;
  board.splice(index, 1, newWord);
  state.setBoard(board);
  state.triggerRefreshCard(state.refreshCard + 1);
}

// TODO: Why does module.exports not work :(
