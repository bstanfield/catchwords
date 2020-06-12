/** @jsx jsx */

import { useEffect, useState } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EndTurn, NewGame, GuessCard } from '../actions/game';
import { scale, projectCardScale } from '../style/scale';
import { hitAPIEndpoint } from '../helpers/util'

import {
  genericFlex,
} from '../style/flex';

import Card from '../components/board/Card';
import Button from '../components/UI/Button';

const defaultGuessState = [];

const getBoard = async (url) => {
  const board = await hitAPIEndpoint('get-existing-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
    board_url: url,
  });
  return board;
}

const headerDivider = scale({
  marginTop: ['10px', '10px', '20px'],
  marginBottom: ['20px', '20px', '40px'],
});

const buttonStyle = scale({
  margin: '20px 20px 20px 0',
  fontSize: '20px',
});

const PlayerBoard = ({ match }) => {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState('team1'); // team1 = red
  const [guesses, setGuesses] = useState({ team1: [], team2: [] });
  const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [blueGuesses, setBlueGuesses] = useState(defaultGuessState);
  const [redGuesses, setRedGuesses] = useState(defaultGuessState);
  const [showBlue, setShowBlue] = useState(false);
  const [showRed, setShowRed] = useState(false);
  const [turnCount, incrementTurnCount] = useState(1);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  // const { board, keys, guesses, teamTurn, started } = props.game;
  const [selectedCards, setSelectedCards] = useState([]);

  const attemptGuess = (index) => {
    const tileType = turn === 'team1'
      ? redTeam[index]
      : blueTeam[index];
    if (tileType === 1) {
      const newArr = R.concat(correctGuesses, [index]);
      setCorrectGuesses(newArr);
    }

    if (turn === 'team1') {
      const newArr = R.concat(redGuesses, [index]);
      setRedGuesses(newArr); 
    } else {
      const newArr = R.concat(blueGuesses, [index]);
      setBlueGuesses(newArr); 
    }
    // alert(`${turn} attempted to click tile #${index}. That's a ${tileType}. ${condition} `);
  };

  const toggleMaster = (color) => {
    if (color === 'red') {
      setShowBlue(false);
      setShowRed(true);
    }
    if (color === 'blue') {
      setShowBlue(true);
      setShowRed(false);
    }
    if (color === 'reset') {
      setShowRed(false);
      setShowBlue(false);
    }
  }

  useEffect(() => {
    const asyncFn = async () => {
      const genBoard = await (await getBoard(match.params.id)).json();
      const { words, playerOne, playerTwo } = genBoard[0];
      setBoard(words);
      setRedTeam(playerOne);
      setBlueTeam(playerTwo);
    }
    asyncFn();
  }, [match.params.id]);

  const RenderPlayerCard = (cardName, index) => {
    const selected = R.includes(index, selectedCards);
    const isCard = card => index === card;

    return (
      <Card
        key={index}
        name={cardName}
        index={index}
        blueTeam={blueTeam}
        redTeam={redTeam}
        showRed={showRed}
        showBlue={showBlue}
        redGuesses={redGuesses}
        blueGuesses={blueGuesses}
        correctGuesses={correctGuesses}
        turn={turn}
        selected={selected}
        select={() => {
          selected
            ? setSelectedCards(R.reject(isCard, selectedCards))
            : setSelectedCards(R.append(index, selectedCards));
        }}
        guessCard={() => {
          attemptGuess(index);
        }}
      />
    );
  };

  // can guess as many as you want - need to store selected cards until turn ends
  //

  return (
    <div>
      <div css={headerDivider}></div>
      <h2 style={{ fontSize: 30 }}>{turn === 'team1' ? "🔴 Red Leader: Give a clue!" : "🔷 Blue Leader: Give a clue!"} </h2>
      <p>Turn #{turnCount}</p>
      <button css={buttonStyle} onClick={() => {
        setTurn(turn === 'team1' ? 'team2' : 'team1')
        incrementTurnCount(turnCount + 1);
       }}>Pass turn</button>
      <div css={genericFlex}>{R.addIndex(R.map)(RenderPlayerCard, board)}</div>
      <button css={buttonStyle} onClick={() => {showBlue === false ? toggleMaster('blue') : toggleMaster('reset')}} >Blue leader cheatsheet</button>
      <button css={buttonStyle} onClick={() => {showRed === false ? toggleMaster('red') : toggleMaster('reset')}} >Red leader cheatsheet</button>
      {/* <Button text="End Turn" onClickFn={() => props.EndTurn(selectedCards)} /> */}
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

export default withRouter(PlayerBoard);
