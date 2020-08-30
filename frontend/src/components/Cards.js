/** @jsx jsx */

import { jsx } from '@emotion/core';
import { genericFlex } from '../style/flex';
import { colors } from '../helpers/util';
import CardUI from './Card';

const Card = ({
  cardName,
  index,
  state,
  handleReplaceWord,
  handleAttemptGuess
}) => {
  let color = 'white';
  // edit this for edit words capability
  if (state.showCheatsheet) {
    if (state.userTeam === 'red') {
      if (state.redKey[index] === 1) {
        color = colors.correctCard;
      } else if (state.redKey[index] === 2) {
        color = colors.assassinCard;
      } else if (state.redKey[index] === 0) {
        color = colors.neutralCard;
      }
    } else if (state.userTeam === 'blue') {
      if (state.blueKey[index] === 1) {
        color = colors.correctCard;
      } else if (state.blueKey[index] === 2) {
        color = colors.assassinCard;
      } else if (state.blueKey[index] === 0) {
        color = colors.neutralCard;
      }
    }
  } else if (
    state.correctBlueGuesses.includes(index) ||
    state.correctRedGuesses.includes(index)
  ) {
    color = colors.correctCard;
  } else if (state.incorrectGuesses.includes(index)) {
    color = colors.assassinCard;
  } else if (
    state.redGuesses.includes(index) ||
    state.blueGuesses.includes(index)
  ) {
    color = colors.neutralCard;
  }

  return (
    <CardUI
      key={index}
      name={cardName}
      color={color}
      index={index}
      refreshCard={state.refreshCard}
      guessing={state.guessingState}
      attemptGuess={() => {
        handleAttemptGuess(index);
      }}
      replaceWord={() => handleReplaceWord(index)}
    />
  );
};

const Cards = props => {
  const { state, handleAttemptGuess, handleReplaceWord } = props;
  return (
    <div css={genericFlex}>
      {state.words.map((word, index) => (
        <Card
          cardName={word}
          index={index}
          state={state}
          handleReplaceWord={handleReplaceWord}
          handleAttemptGuess={handleAttemptGuess}
        />
      ))}
    </div>
  );
};

export default Cards;
