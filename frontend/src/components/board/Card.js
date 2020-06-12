/** @jsx jsx */

import { jsx } from '@emotion/core';
import { colors } from '../../style/theme';
import { scale } from '../../style/scale';
import { center } from '../../style/text';
import { capitalizeFirst } from '../../helpers/util';

const cardContainer = (colorToDisplay) =>
  scale({
    width: '185px',
    height: '85px',
    border: '1px solid #333333',
    borderRadius: '3px',
    backgroundColor: colorToDisplay || 'white',
    margin: '5px 5px',
  });

  const chooseCardToShow = (showRed, showBlue, redTeam, blueTeam, index, redGuesses, blueGuesses, turn, correctGuesses) => {
    let colorToDisplay = 'white';
    if (showRed) {
      if (redTeam[index] === 0) {
        colorToDisplay = colors.neutralCard;
      }
      if (redTeam[index] === 1) {
        colorToDisplay = colors.correctCard;
      }
      if (redTeam[index] === 2) {
        colorToDisplay = colors.assassinCard;
      }
    }
    if (showBlue) {
      if (blueTeam[index] === 0) {
        colorToDisplay = colors.neutralCard;
      }
      if (blueTeam[index] === 1) {
        colorToDisplay = colors.correctCard;
      }
      if (blueTeam[index] === 2) {
        colorToDisplay = colors.assassinCard;
      }
    }
    if (turn === 'team1') {
      if (redGuesses.includes(index)) {
        const tileType = redTeam[index];
        if (tileType === 0) {
          colorToDisplay = colors.neutralCard;
        }
        if (tileType === 1) {
          colorToDisplay = colors.correctCard;
        }
        if (tileType === 2) {
          colorToDisplay = colors.assassinCard;
        }
      }
    }
    if (turn === 'team2') {
      if (blueGuesses.includes(index)) {
        const tileType = blueTeam[index];
        if (tileType === 0) {
          colorToDisplay = colors.neutralCard;
        }
        if (tileType === 1) {
          colorToDisplay = colors.correctCard;
        }
        if (tileType === 2) {
          colorToDisplay = colors.assassinCard;
        }
      }
    }
    if (correctGuesses.includes(index)) {
      colorToDisplay = colors.correctCard;
    }
    return cardContainer(colorToDisplay);
  }
  

const cardText = (size) => scale({
  fontSize: size || 22,
  lineHeight: '10px',
});

const buttonStyle = selected =>
  scale({
    cursor: 'pointer',
    outline: 'none',
    transition: '300ms opacity',
    backgroundColor: selected && colors.neutralCard,
    opacity: 0.8,
    border: selected && '1px solid green',
    '&:hover': {
      opacity: 0.7,
    },
  });

const Card = props => {
  const { name, index, guess, removeState, replaceWord, guessCard, selected, redTeam, blueTeam, showBlue, showRed, redGuesses, blueGuesses, turn, correctGuesses } = props;

  if (guess === 2) {
    props.SetToast({
      text: 'YOU DIED!!!!',
      type: 'alert',
      buttonAction: () => props.NewGame(),
      buttonText: 'New Game',
    });
  }

  let size = 22;
  if (name) {
    if (name.length > 0 && name.length < 9) {
      size = 40;
    } else if (name.length === 9) {
      size = 30;
    }
  }
  return (
    <button
      css={[chooseCardToShow(showRed, showBlue, redTeam, blueTeam, index, redGuesses, blueGuesses, turn, correctGuesses), buttonStyle(selected)]}
      key={index}
      onClick={() => {removeState === false ? guessCard() : replaceWord()}}
    >
      <h4 css={[center, cardText(size)]}>{capitalizeFirst(name)}</h4> 
      {removeState && <p style={{ marginBottom: '-22px' }}>Swap</p>}
    </button>
  );
};

export default Card;
