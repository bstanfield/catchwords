/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import {
  genericFlex,
} from '../style/flex';
import { attemptGuess, replaceWord } from '../helpers/util'
import Card from './Card';

const RenderCard = (cardName, index, state, modifiers) => {
  let color = 'white';
  // edit this for edit words capability
  if (state.showCheatsheet.red || state.showCheatsheet.blue) {
    if (state.showCheatsheet.red) {
      if (state.redTeam[index] === 1) {
        color = 'green'
      } else if (state.redTeam[index] === 2) {
        color = 'red';
      } else if (state.redTeam[index] === 0) {
        color = 'grey';
      }
    } else if (state.showCheatsheet.blue) {
      if (state.blueTeam[index] === 1) {
        color = 'green'
      } else if (state.blueTeam[index] === 2) {
        color = 'red';
      } else if (state.blueTeam[index] === 0) {
        color = 'grey';
      }
    }
  } else {
    if (state.correctBlueGuesses.includes(index) || state.correctRedGuesses.includes(index)) {
      // console.log('index is including in correct guesses!')
      color = 'green';
    } else if (state.incorrectGuesses.includes(index)) {
      // console.log('index is including in WRONG guesses!')
      color = 'red';
    } else if (state.redGuesses.includes(index) || state.blueGuesses.includes(index)) {
      // console.log('index is including in OK guesses!')
      color = 'grey';
    }
  }

  return (<Card
    key={index}
    refreshCard={state.refreshCard}
    name={cardName}
    color={color}
    index={index}
    guessing={state.guessingState}
    attemptGuess={() => {
      attemptGuess(
        index,
        state,
        modifiers,
      );
      modifiers.setCurrentTurnGuesses(state.currentTurnGuesses + 1);
    }}
    replaceWord={() => {
      replaceWord(index, state.url, state.board, { setBoard: modifiers.setBoard, refreshCard: state.refreshCard, triggerRefreshCard: modifiers.triggerRefreshCard });
    }}
  />)
};

const Cards = props => {
  const { state, modifiers } = props;
  return(
    <div css={genericFlex}>{state.board.map((item, index) => RenderCard(item, index, state, modifiers))}</div>
  )
}

export default Cards;