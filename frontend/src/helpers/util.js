/** @jsx jsx */

import * as R from 'ramda';

export const capitalizeFirst = x => R.concat(R.toUpper(R.head(x)), R.tail(x));

export const colors = {
  textLight: 'var(--text-light)',
  textDark: 'var(--text-dark)',

  background: 'var(--background)',
  backgroundEmphasis: 'var(--background-emphasis)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  border: 'var(--border)',
  boxShadow: 'var(--box-shadow)',

  buttonSimple: 'var(--button-simple)',
  buttonSimpleHover: 'var(--button-simple-hover)',
  buttonSimpleSelect: 'var(--button-simple-select)',
  buttonGreen: 'var(--button-green)',
  defaultCard: 'var(--card-default)',
  neutralCard: 'var(--card-neutral)',
  correctCard: 'var(--card-correct)',
  assassinCard: 'var(--card-assassin)',
};

export const findCorrectGuesses = (teamBoard, teamGuesses) => {
  return teamGuesses.filter(guess => teamBoard[guess] === 1);
};

export const findIncorrectGuesses = (teamBoard, teamGuesses) => {
  const incorrect = teamGuesses.filter(guess => teamBoard[guess] === 2);
  return incorrect;
};

export const scrollToPosition = (position) => {
  return window.scrollTo({ top: position - 70, behavior: 'smooth' });
};