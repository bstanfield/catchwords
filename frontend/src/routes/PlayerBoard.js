/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EndTurn, NewGame, GuessCard } from '../actions/game';
import { scale, projectCardScale } from '../style/scale';
import { contentContainer } from '../style/layout';
import { maxWidth, marginAuto } from '../style/misc';
import {
  genericFlex,
  flexUntilMobile,
  justifyContentStart,
} from '../style/flex';

import Card from '../components/board/Card';
import Button from '../components/UI/Button';

import { sortContentByDate } from '../helpers/util';

const headerDivider = scale({
  marginTop: ['10px', '10px', '20px'],
  marginBottom: ['20px', '20px', '40px'],
});

const PlayerBoard = props => {
  const { board, keys, guesses, teamTurn, started } = props.game;
  const [selectedCards, setSelectedCards] = useState([]);

  const RenderPlayerCard = (cardName, index) => {
    const selected = R.includes(index, selectedCards);
    const isCard = card => index === card;
    return (
      <Card
        key={index}
        name={cardName}
        index={index}
        guess={guesses[teamTurn][index]}
        selected={selected}
        select={() => {
          selected
            ? setSelectedCards(R.reject(isCard, selectedCards))
            : setSelectedCards(R.append(index, selectedCards));
        }}
        guessCard={() => {
          props.GuessCard(index);
        }}
      />
    );
  };

  // can guess as many as you want - need to store selected cards until turn ends
  //

  return (
    <div>
      <div css={headerDivider}></div>
      <h2>{teamTurn} Player board</h2>
      <div css={genericFlex}>{R.addIndex(R.map)(RenderPlayerCard, board)}</div>
      <Button text="End Turn" onClickFn={() => props.EndTurn(selectedCards)} />
      <br />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ EndTurn, NewGame, GuessCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoard);
