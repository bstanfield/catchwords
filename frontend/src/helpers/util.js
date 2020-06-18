/** @jsx jsx */

import * as R from 'ramda';
import Network from '../lib/network';

export const getBoard = async (url) => {
  const [response, responseBody] = await Network.get(`get-existing-board/${url}`);
  return responseBody;
};

// PlayerBoard helper fns
export const triggerModal = (setShowModal) => {
  setShowModal(true);
  setTimeout(() => {
    setShowModal(false);
  }, 3000);
};

export const replaceWord = async (index, url, board, state) => {
  const [response, responseBody] = await Network.get(`swap-word/${url}/${index}`);
  const updatedBoard = responseBody;
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
