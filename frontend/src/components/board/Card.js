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

const cardContainer = guess =>
  scale({
    width: '180px',
    height: '120px',
    border: '1px solid #333333',
    borderRadius: '3px',
    backgroundColor:
      guess === 0
        ? colors.neutralCard
        : guess === 1
        ? colors.correctCard
        : guess === 2
        ? colors.assassinCard
        : 'white',
    margin: '5px',
  });

const cardText = scale({
  lineHeight: '120px',
});

const buttonStyle = selected =>
  scale({
    cursor: 'pointer',
    outline: 'none',
    transition: '300ms background-color',
    backgroundColor: selected && colors.neutralCard,
    opacity: 0.8,
    border: selected && '1px solid green',
    '&:hover': {
      backgroundColor: !selected && 'rgba(0,0,0,0.03)',
    },
  });

const Card = props => {
  const { name, index, guess, gameKey, guessCard, selected, toaster } = props;

  if (guess === 2 && !toaster.show) {
    props.SetToast({
      text: 'YOU DIED!!!!',
      type: 'alert',
      buttonAction: () => props.NewGame(),
      buttonText: 'New Game',
    });
  }

  if (!R.isNil(guess) || !R.isNil(gameKey)) {
    return (
      <div css={cardContainer(R.defaultTo(gameKey, guess))} key={index}>
        <h4 css={[center, cardText]}>{capitalizeFirst(name)}</h4>
      </div>
    );
  }
  return (
    <button
      css={[cardContainer(), buttonStyle(selected)]}
      key={index}
      onClick={() => guessCard()}
    >
      <h4 css={[center, cardText]}>{capitalizeFirst(name)}</h4>
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
