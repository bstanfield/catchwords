/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EndTurn, NewGame, ResetGame } from '../actions/game';
import { scale, projectCardScale } from '../style/scale';
import {
  genericFlex,
} from '../style/flex';

import Card from '../components/board/Card';
import Button from '../components/UI/Button';

const headerDivider = scale({
  marginTop: ['10px', '10px', '20px'],
  marginBottom: ['20px', '20px', '40px'],
});


// BLUE TEAM
const GameMasterBoard2 = props => {
  const { board, keys, guesses, teamTurn, started } = props.game;
  const [selectedCards, setSelectedCards] = useState([]);
  // Show which cards are selected here too!

  const RenderGameMasterCard = (cardName, index) => (
    <Card
      key={index}
      name={cardName}
      index={index}
      gameKey={keys['team2'][index]}
    />
  );

  // can guess as many as you want - need to store selected cards until turn ends
  //

  return (
    <div>
      <div css={headerDivider}></div>
      <h2>Master board (Team 2)</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameMasterBoard2);
