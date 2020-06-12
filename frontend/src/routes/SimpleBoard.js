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
import { hitAPIEndpoint } from '../helpers/util'

const flex = scale({
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
});

const cardContainer = scale({
  width: 'fit-content',
  padding: '5px 20px 5px 20px',
});

const generateBoard = async () => {
  const board = await hitAPIEndpoint('generate-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
  });
  return board;
}

const SimpleBoard = props => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [board, setBoard] = useState([]);
  const [playerOne, setPlayerOne] = useState([]);
  const [playerTwo, setPlayerTwo] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      const genBoard = await (await generateBoard()).json();
      const words = genBoard.words;
      setBoard(genBoard.words);
      setPlayerOne(genBoard.playerOne);
      setPlayerTwo(genBoard.playerTwo);
    }
    asyncFn();
  }, []);


  const RenderPlayerCard = (cardName, index) => {
    const selected = R.includes(index, selectedCards);
    const isCard = card => index === card;
    return (
    <div css={cardContainer}>
      <h1>{cardName}</h1>
    </div>
    );
  };

  // can guess as many as you want - need to store selected cards until turn ends
  //

  return (
    <div>
      <div css={flex}>{R.addIndex(R.map)(RenderPlayerCard, board)}</div>
      <div>{playerOne}</div>
      <div>{playerTwo}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleBoard);
