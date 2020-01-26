/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetToast } from '../actions/toaster';
import { EndTurn, NewGame } from '../actions/game';
import { GuessCard } from '../actions/guesses';
import { scale, projectCardScale } from '../style/scale';
import { contentContainer } from '../style/layout';
import { maxWidth, fullWidth, marginAuto } from '../style/misc';
import { genericFlex, noWrapFlex, justifyContentStart } from '../style/flex';

import TextInput from '../components/UI/TextInput';
import handWave from '../static/images/waving-hand.png';
import Dialog from '../components/UI/Dialog';
import Card from '../components/board/Card';
import CardContent from '../components/UI/CardContent';
import Button from '../components/UI/Button';

import { hitAPI } from '../helpers/util';

const roleButton = scale({
  width: ['100%', '100%', '32%'],
});

const messageIcon = scale({
  width: '50px',
  textAlign: 'center',
  margin: 'auto',
  position: 'relative',
  display: 'block',
  marginBottom: '15px',
});

const StartGame = props => {
  const { board, guesses, game } = props;
  const { teamTurn } = game;
  const { words } = board;

  const [boardCode, setBoardCode] = useState();
  const [role, setRole] = useState('player');
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    const link =
      role === 'team1'
        ? `/game-master-1/${redirect}`
        : role === 'team2'
        ? `/game-master-2/${redirect}`
        : `/player-board/${redirect}`;
    return <Redirect to={link} />;
  }

  return (
    <div>
      >
      <Dialog showDialog={true}>
        <CardContent>
          <img src={handWave} css={messageIcon} />
          <h2>Welcome to Catchwords!</h2>
          <br />
          <p>
            To begin, please choose your role. If you'd like to enter an
            existing game, please paste in the board code below:
          </p>
          <div css={genericFlex}>
            <div css={roleButton}>
              <Button
                size="medium"
                type={role === 'player' ? 'green' : 'invertedGreen'}
                text="Player"
                onClickFn={() => setRole('player')}
              />
            </div>
            <div css={roleButton}>
              <Button
                size="medium"
                type={role === 'team1' ? 'green' : 'invertedGreen'}
                text="Team 1 Game Leader"
                onClickFn={() => setRole('team1')}
              />
            </div>
            <div css={roleButton}>
              <Button
                size="medium"
                type={role === 'team2' ? 'green' : 'invertedGreen'}
                text="Team 2 Game Leader"
                onClickFn={() => setRole('team2')}
              />
            </div>
          </div>
          <br />
          <TextInput
            handleInputChange={v => setBoardCode(v)}
            placeholder="Board Code"
            value={boardCode}
          />
          <br />
          <br />
          <Button
            size="large"
            text={boardCode ? 'Enter existing game' : 'Start New Game'}
            onClickFn={async () => {
              let boardCodeToUse = boardCode;
              if (!boardCode) {
                boardCodeToUse = await props.NewGame();
              }
              setRedirect(boardCodeToUse);
            }}
          />
        </CardContent>
      </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
