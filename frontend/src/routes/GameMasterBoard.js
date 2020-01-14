/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EndTurn, NewGame, ResetGame } from '../actions/game';
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

const GameMasterBoard = props => {
  const { teamTurn } = props;
  const { board, keys, guesses, started } = props.game;
  const [selectedCards, setSelectedCards] = useState([]);
  // Show which cards are selected here too!

  const RenderGameMasterCard = (cardName, index) => (
    <Card
      key={index}
      name={cardName}
      index={index}
      gameKey={keys[teamTurn][index]}
    />
  );

  // can guess as many as you want - need to store selected cards until turn ends
  //

  return (
    <div>
      <div css={headerDivider}></div>
      <h2>{teamTurn} Game master board</h2>
      <div css={genericFlex}>
        {R.addIndex(R.map)(RenderGameMasterCard, board)}
      </div>
      <Button text="Reset Game" onClickFn={() => props.ResetGame()} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ EndTurn, NewGame, ResetGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMasterBoard);
