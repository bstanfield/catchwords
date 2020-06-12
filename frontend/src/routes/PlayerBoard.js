/** @jsx jsx */

import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { scale } from '../style/scale';
import { hitAPIEndpoint } from '../helpers/util'

import {
  genericFlex,
} from '../style/flex';

import Card from '../components/Card';

const defaultGuessState = [];

const getBoard = async (url) => {
  const board = await hitAPIEndpoint('get-existing-board', {
    password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
    board_url: url,
  });
  return board;
}

const primaryContainer = scale({
  maxWidth: '1000px',
  margin: 'auto',
  'h1, h2, h3, h4, p, a': {
    fontFamily: 'system-ui !important',
    margin: 0,
  },
  h4: {
    fontWeight: 500,
  }
});

const topContainer = scale({
  position: 'relative',
  marginTop: '12px',
  paddingBottom: '12px',
  marginBottom: '8px',
  borderBottom: '2px solid #eeeeee',
});

const pageFade = scale({
  // 
});

const absolutePassTurn = scale({
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '8px 18px',
  cursor: 'pointer',
  borderRadius: '3px',
  margin: '20px 20px 20px 0',
  fontSize: '20px',
  position: 'absolute',
  top: '-22px',
  right: 0,
});

const buttonStyle = (showing) => scale({
  padding: '8px 18px',
  borderRadius: '3px',
  border: 'none',
  cursor: 'pointer',
  margin: '20px 20px 20px 0',
  fontSize: '20px',
  backgroundColor: showing ? '#2ef72e' : '#eeeeee',
  '&:hover': {
    backgroundColor: showing ? '#2ef72e' : '#d0d0d0',
    opacity: showing ? 0.7 : 1,
  }
});

const PlayerBoard = ({ match }) => {
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState('team1'); // team1 = red
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
  const [showRemove, setShowRemove] = useState(false);
  const [refreshCard, triggerRefreshCard] = useState(0);

  const replaceWord = async (index, url, board) => {
    const response = await hitAPIEndpoint('swap-word-on-existing-board', {
      password: '5PwhsP3Efoyi6HkgJ7+o0rGUHmU8sY8+yOtqbo+Euvg',
      board_url: url,
      index,
    });
    const updatedBoard = await (response.json());
    const newWord = updatedBoard.word;
    board.splice(index, 1, newWord);
    setBoard(board);
    triggerRefreshCard(refreshCard + 1);
  }

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
        refreshCard={refreshCard}
        name={cardName}
        index={index}
        blueTeam={blueTeam}
        redTeam={redTeam}
        showRed={showRed}
        showBlue={showBlue}
        removeState={showRemove}
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
        replaceWord={() => {
          replaceWord(index, match.params.id, board);
        }}
      />
    );
  };

  // can guess as many as you want - need to store selected cards until turn ends
  //

  return (
    <div css={primaryContainer}>
      <div css={pageFade}>
      <div css={topContainer}>
        <h2 style={{ fontSize: 30, display: 'inline', marginRight: '20px' }}>{turn === 'team1' ? "🔴 Red Leader: Give a clue!" : "🔷 Blue Leader: Give a clue!"} </h2>
        <strong><p style={{ position: 'absolute', top: 2, right: 160, opacity: 0.7 }}>TURN #{turnCount}</p></strong>
        <button css={absolutePassTurn} onClick={() => {
          setTurn(turn === 'team1' ? 'team2' : 'team1')
          incrementTurnCount(turnCount + 1);
        }}>End turn</button>
       </div>
      <div css={genericFlex}>{R.addIndex(R.map)(RenderPlayerCard, board)}</div>
      <button css={buttonStyle(showBlue)} onClick={() => {showBlue === false ? toggleMaster('blue') : toggleMaster('reset')}} >Blue leader cheatsheet</button>
      <button css={buttonStyle(showRed)} onClick={() => {showRed === false ? toggleMaster('red') : toggleMaster('reset')}} >Red leader cheatsheet</button>
      <button css={buttonStyle(showRemove)} onClick={() => {showRemove === false ? setShowRemove(true) : setShowRemove(false)}} >Edit words mode</button>
      {/* <Button text="End Turn" onClickFn={() => props.EndTurn(selectedCards)} /> */}
      <br />
    </div>
    </div>
  );
};

export default withRouter(PlayerBoard);
