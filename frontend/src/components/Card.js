/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { capitalizeFirst, colors } from '../helpers/util';

const cardContainer = (colorToDisplay) =>
  scale({
    width: '185px',
    height: '85px',
    border: '1px solid #333333',
    borderRadius: '3px',
    backgroundColor: colorToDisplay || 'white',
    margin: '5px 5px',
    boxShadow: '0 2px 5px 0 #cacaca'
  });

  const setCardColor = (condition) => {
    switch (condition) {
      case 0:
        return colors.neutralCard;
      case 1:
        return colors.correctCard;
      case 2:
        return colors.assassinCard;
      default:
        return colors.neutralCard;
    }
  }

  const chooseCardToShow = (showRed, showBlue, redTeam, blueTeam, index, redGuesses, blueGuesses, turn, correctGuesses, ) => {
    let colorToDisplay = 'white';
    if (showRed) {
      colorToDisplay = setCardColor(redTeam[index]);
    }
    if (showBlue) {
      colorToDisplay = setCardColor(blueTeam[index]);
    }
    if (turn === 'red') {
      if (redGuesses.includes(index)) {
        const tileType = redTeam[index];
        colorToDisplay = setCardColor(tileType);
      }
    }
    if (turn === 'blue') {
      if (blueGuesses.includes(index)) {
        const tileType = blueTeam[index];
        colorToDisplay = setCardColor(tileType);
      }
    }
    // Green guesses persist between turns, but toggles off when cheatsheet is on
    if (correctGuesses.includes(index) && !showBlue && !showRed) {
      colorToDisplay = colors.correctCard;
    }
    return cardContainer(colorToDisplay);
  }
  

const cardText = (size) => scale({
  textAlign: 'center',
  fontSize: size || 22,
  lineHeight: '10px',
});

const buttonStyle = selected =>
  scale({
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    transition: '300ms opacity',
    backgroundColor: selected && colors.neutralCard,
    opacity: 1,
    color: '#333333',
    border: selected && '1px solid green',
    '&:hover': {
      opacity: 0.8,
    },
  });

const Card = props => {
  const { name, index, removeState, replaceWord, guessCard, selected, redTeam, blueTeam, showBlue, showRed, redGuesses, blueGuesses, turn, correctGuesses, correctGuessesByBlueTeam, correctGuessesByRedTeam } = props;

  let size = 28;
  if (name) {
    if (name.length > 0 && name.length <= 8) {
      size = 38;
    } else if (name.length > 8 && name.length <= 12) {
      size = 32;
    } else if (name.length > 12) {
      size = 24;
    }
  }
  return (
    <button
      css={[chooseCardToShow(showRed, showBlue, redTeam, blueTeam, index, redGuesses, blueGuesses, turn, correctGuesses, ), buttonStyle(selected)]}
      key={index}
      onClick={() => {removeState === false ? guessCard() : replaceWord()}}
    >
      <h4 css={[cardText(size)]}>{capitalizeFirst(name)}</h4> 
      {removeState && <p style={{ position: 'absolute', bottom: 5, opacity: 0.5 }}>Swap</p>}
      {correctGuessesByBlueTeam.includes(index) && <p style={{ fontSize: 10, position: 'absolute', top: 3, right: 6 }}>🔷</p>}
      {correctGuessesByRedTeam.includes(index) && <p style={{ fontSize: 10, position: 'absolute', top: 3, right: 6 }}>🔴</p>}
    </button>
  );
};

export default Card;
