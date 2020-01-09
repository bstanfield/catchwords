/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors } from '../../style/theme';
import { scale } from '../../style/scale';
import { marginAuto } from '../../style/misc';
import { center } from '../../style/text';
import { capitalizeFirst } from '../../helpers/util';

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
    backgroundColor: selected && colors.neutralCard,
    opacity: 0.8,
    border: selected && '1px solid green',
  });

const Card = props => {
  const { name, index, guess, gameKey, select, selected } = props;

  if (guess || gameKey) {
    return (
      <div css={cardContainer(guess || gameKey)} key={index}>
        <h4 css={[center, cardText]}>{capitalizeFirst(name)}</h4>
      </div>
    );
  }
  return (
    <button
      css={[cardContainer(), buttonStyle(selected)]}
      key={index}
      onClick={() => select()}
    >
      <h4 css={[center, cardText]}>{capitalizeFirst(name)}</h4>
    </button>
  );
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
