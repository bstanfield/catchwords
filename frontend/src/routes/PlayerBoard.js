/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EndTurn, NewGame, GuessCard } from '../actions/game';
import { scale, projectCardScale } from '../style/scale';
import { contentContainer } from '../style/layout';
import { maxWidth, fullWidth, marginAuto } from '../style/misc';
import { genericFlex, noWrapFlex, justifyContentStart } from '../style/flex';

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

  // Probably want to see if someone else has selected it
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

  const incorrectGuesses = x => R.isNil(x) || R.equals(x, 0);
  const teamPoints = teamTurn =>
    R.pipe(R.reject(incorrectGuesses), R.length)(guesses[teamTurn]);

  const team1Points = teamPoints('team1');
  const totalPoints = teamPoints('team1') + teamPoints('team2');

  const guessesRemaining = R.pipe(
    R.reject(R.isNil),
    R.length,
    R.subtract(9)
  )(guesses[teamTurn]);

  return (
    <div>
      <div css={headerDivider}></div>
      <h2>{teamTurn} Player board</h2>
      <div css={noWrapFlex}>
        <div css={genericFlex}>
          {R.addIndex(R.map)(RenderPlayerCard, board)}
        </div>
        <div css={[maxWidth(150), fullWidth]}>
          <Button
            size="large"
            text="End Turn"
            onClickFn={() => props.EndTurn(selectedCards)}
          />
          <br />
          <br />
          <h4>Team 1 + 2 Points: {totalPoints}</h4>
          <h4>Team Points: {team1Points}</h4>
          <h4>Remaining Guesses: {guessesRemaining}</h4>
        </div>
      </div>
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
