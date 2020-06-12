/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NewGame } from '../../actions/game';
import { SetToast } from '../../actions/toaster';

import { colors } from '../../style/theme';
import { scale } from '../../style/scale';
import { center } from '../../style/text';
import { capitalizeFirst, hexToRgba } from '../../helpers/util';
import { withRouter } from 'react-router-dom';

const cardContainer = (colorToDisplay) =>
  scale({
    width: '180px',
    height: '100px',
    border: '1px solid #333333',
    borderRadius: '3px',
    backgroundColor: colorToDisplay || 'white',
    margin: '10px 5px',
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
  const { name, index, guess, gameKey, guessCard, selected, toaster, redTeam, blueTeam, showBlue, showRed, redGuesses, blueGuesses, turn, correctGuesses } = props;

  if (guess === 2 && !toaster.show) {
    props.SetToast({
      text: 'YOU DIED!!!!',
      type: 'alert',
      buttonAction: () => props.NewGame(),
      buttonText: 'New Game',
    });
  }

  // 0 is neutral
// 1 is correct
// 2 is assassin
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
      onClick={() => guessCard()}
    >
      <h4 css={[center, cardText(size)]}>{capitalizeFirst(name)}</h4> 
    </button>
  );
};

function mapStateToProps(state) {
  return { toaster: state.toaster };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ NewGame, SetToast }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
