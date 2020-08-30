/** @jsx jsx */

import { jsx } from '@emotion/core';
import { genericFlex } from '../style/flex';
import { attemptGuess, replaceWord, colors } from '../helpers/util';
import Card from './Card';

const RenderCard = (cardName, index, state, modifiers) => {
  let color = 'white';
  // edit this for edit words capability
  if (state.showCheatsheet.red || state.showCheatsheet.blue) {
    if (state.showCheatsheet.red) {
      if (state.redTeam[index] === 1) {
        color = colors.correctCard;
      } else if (state.redTeam[index] === 2) {
        color = colors.assassinCard;
      } else if (state.redTeam[index] === 0) {
        color = colors.neutralCard;
      }
    } else if (state.showCheatsheet.blue) {
      if (state.blueTeam[index] === 1) {
        color = colors.correctCard;
      } else if (state.blueTeam[index] === 2) {
        color = colors.assassinCard;
      } else if (state.blueTeam[index] === 0) {
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
    <Card
      key={index}
      refreshCard={state.refreshCard}
      name={cardName}
      color={color}
      index={index}
      guessing={state.guessingState}
      attemptGuess={() => {
        attemptGuess(index, state, modifiers);
        modifiers.setCurrentTurnGuesses(state.currentTurnGuesses + 1);
      }}
      replaceWord={() => {
        replaceWord(index, state.id, state.board, {
          setBoard: modifiers.setBoard,
          refreshCard: state.refreshCard,
          triggerRefreshCard: modifiers.triggerRefreshCard
        });
      }}
    />
  );
};

const Cards = props => {
  const { state, modifiers } = props;
  return (
    <div css={genericFlex}>
      {state.board.map((item, index) =>
        RenderCard(item, index, state, modifiers)
      )}
    </div>
  );
};

export default Cards;
