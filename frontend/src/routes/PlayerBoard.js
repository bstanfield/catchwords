/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetToast } from '../actions/toaster';
import { EndTurn, NewGame } from '../actions/game';
import { GuessCard } from '../actions/guesses';
import { scale, projectCardScale } from '../style/scale';
import { contentContainer } from '../style/layout';
import { maxWidth, fullWidth, marginAuto } from '../style/misc';
import { genericFlex, noWrapFlex, justifyContentStart } from '../style/flex';

import checkmark from '../static/checkmark.svg';
import alert from '../static/alert.svg';
import Dialog from '../components/UI/Dialog';
import Card from '../components/board/Card';
import CardContent from '../components/UI/CardContent';
import Button from '../components/UI/Button';

import { hitAPI } from '../helpers/util';

const headerDivider = scale({
  marginTop: ['10px', '10px', '20px'],
  marginBottom: ['20px', '20px', '40px'],
});

const messageIcon = scale({
  width: '50px',
  textAlign: 'center',
  margin: 'auto',
  position: 'relative',
  display: 'block',
  marginBottom: '15px',
});

const PlayerBoard = props => {
  const { board, guesses, game } = props;
  const { teamTurn } = game;
  const { words } = board;

  // Probably want to see if someone else has selected it
  const RenderPlayerCard = (cardName, index) => {
    console.log('guesses[teamTurn][index]', guesses[teamTurn][index]);
    return (
      <Card
        key={index}
        name={cardName}
        index={index}
        guess={guesses[teamTurn][index]}
        otherTeamGuess={
          guesses[teamTurn === 'team1' ? 'team2' : 'team1'][index]
        }
        guessCard={() => {
          props.GuessCard(index, teamTurn, board[teamTurn]);
        }}
      />
    );
  };

  const correctGuesses = x => R.equals(x, 1);
  const calculateTeamPoints = teamTurn =>
    R.pipe(R.filter(correctGuesses), R.length)(guesses[teamTurn]);

  const currentTeamPoints = calculateTeamPoints(teamTurn);
  const totalPoints =
    calculateTeamPoints('team1') + calculateTeamPoints('team2');

  const guessesRemaining = R.pipe(
    R.reject(R.isNil),
    R.length,
    R.subtract(9)
  )(guesses[teamTurn]);

  const assassinated = R.includes(2, guesses[teamTurn]);

  // TODO: Disable board when alert shows for win/loss
  // TODO: Move win/loss logic to reducer (?)
  // TODO: Create dialog box to show winning success and losing
  // Sometimes props.NewGame() doesn't work

  return (
    <div>
      <div css={headerDivider}></div>
      <h2>{teamTurn} Player board</h2>
      {/* If other team has guesses remaining, show option to spectate */}
      {/* If not, show loss */}
      <Dialog showDialog={assassinated}>
        <CardContent>
          <img src={alert} css={messageIcon} />
          <h2>Shoot, you died. Want to play again?</h2>
          <br />
          <Button
            size="medium"
            text="New Game"
            onClickFn={() => props.NewGame()}
          />
        </CardContent>
      </Dialog>
      <Dialog showDialog={guessesRemaining === 0}>
        <CardContent>
          <img src={alert} css={messageIcon} />
          <h2>You ran out of guesses! Play again?</h2>
          <br />
          <Button
            size="medium"
            text="New Game"
            onClickFn={() => props.NewGame()}
          />
        </CardContent>
      </Dialog>
      <Dialog showDialog={totalPoints === 15}>
        <CardContent>
          <img src={checkmark} css={messageIcon} />
          <h2>You guessed all of the cards! Play again?</h2>
          <br />
          <Button
            size="medium"
            text="New Game"
            onClickFn={() => props.NewGame()}
          />
        </CardContent>
      </Dialog>
      <div css={noWrapFlex}>
        <div css={genericFlex}>
          {R.addIndex(R.map)(RenderPlayerCard, words)}
        </div>
        <div css={[maxWidth(150), fullWidth]}>
          <Button
            size="large"
            text="End Turn"
            onClickFn={() => props.EndTurn()}
          />
          <br />
          <br />
          <h4>Team 1 + 2 Points: {totalPoints}</h4>
          <h4>Team Points: {currentTeamPoints}</h4>
          <h4>Remaining Guesses: {guessesRemaining}</h4>
        </div>
      </div>
      <br />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    board: state.board,
    game: state.game,
    toaster: state.toaster,
    guesses: state.guesses,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { EndTurn, NewGame, GuessCard, SetToast },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoard);
