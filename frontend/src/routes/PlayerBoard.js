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
    password: 'buckslake',
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
  paddingTop: '12px',
  paddingBottom: '12px',
  marginBottom: '16px',
  borderBottom: '2px solid #e0e0e0',
});

const pageFade = scale({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  width: '100vw',
  height: '100%',
  zIndex: 9999,
});

const modal = scale({
  borderRadius: '6px',
  fontFamily: 'system-ui',
  backgroundColor: 'white',
  padding: '20px 40px'
});

const absolutePassTurn = (guesses) => scale({
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '3px',
  margin: '20px 20px 20px 0',
  fontSize: '22px',
  position: 'absolute',
  top: '-12px', 
  right: '-12px',
  opacity: guesses > 0 ? 1 : 0.5,
  '&:hover': {
    opacity: 1,
  }
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
  const [correctGuessesByBlueTeam, setCorrectGuessesByBlueTeam] = useState([]);
  const [correctGuessesByRedTeam, setCorrectGuessesByRedTeam] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [refreshCard, triggerRefreshCard] = useState(0);
  const [currentTurnGuesses, setCurrentTurnGuesses] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const triggerModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const replaceWord = async (index, url, board) => {
    const response = await hitAPIEndpoint('swap-word-on-existing-board', {
      password: 'buckslake',
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
      if (tileType === 1) {
        const newArr = R.concat(correctGuessesByBlueTeam, [index]);
        setCorrectGuessesByBlueTeam(newArr);
      }
    } else {
      const newArr = R.concat(blueGuesses, [index]);
      setBlueGuesses(newArr); 
      if (tileType === 1) {
        const newArr = R.concat(correctGuessesByRedTeam, [index]);
        setCorrectGuessesByRedTeam(newArr);
      }
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
        darkMode={darkMode}
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
        correctGuessesByBlueTeam={correctGuessesByBlueTeam}
        correctGuessesByRedTeam={correctGuessesByRedTeam}
        turn={turn}
        selected={selected}
        select={() => {
          selected
            ? setSelectedCards(R.reject(isCard, selectedCards))
            : setSelectedCards(R.append(index, selectedCards));
        }}
        guessCard={() => {
          attemptGuess(index);
          setCurrentTurnGuesses(currentTurnGuesses + 1);
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
    <div>
      {showModal && 
        <div css={pageFade}>
          <div css={modal}>
            <h1>{turn === 'team2' ? '🔷 Blue Leader' : '🔴 Red Leader'}: Give a clue!</h1>
          </div>
        </div>
      }
      <div css={primaryContainer}>
        <div css={topContainer}>
          <h2 style={{ fontSize: 30, display: 'inline', marginRight: '20px' }}>{turn === 'team1' ? "🔴 Red Leader: Give a clue!" : "🔷 Blue Leader: Give a clue!"} </h2>
          <strong><p style={{ position: 'absolute', top: 20, right: 160, opacity: 0.7 }}>Turn #{turnCount}</p></strong>
          <button css={absolutePassTurn(currentTurnGuesses)} onClick={() => {
            setTurn(turn === 'team1' ? 'team2' : 'team1')
            incrementTurnCount(turnCount + 1);
            setCurrentTurnGuesses(0);
            triggerModal();
          }}>End turn</button>
        </div>
        <div css={genericFlex}>{R.addIndex(R.map)(RenderPlayerCard, board)}</div>
        <button css={buttonStyle(showRed)} onClick={() => {showRed === false ? toggleMaster('red') : toggleMaster('reset')}} >🔴 Red leader cheatsheet</button>
        <button css={buttonStyle(showBlue)} onClick={() => {showBlue === false ? toggleMaster('blue') : toggleMaster('reset')}} >🔷 Blue leader cheatsheet</button>
        <button css={buttonStyle(showRemove)} onClick={() => {showRemove === false ? setShowRemove(true) : setShowRemove(false)}} >Edit words mode</button>
        {/* <Button text="End Turn" onClickFn={() => props.EndTurn(selectedCards)} /> */}
        <br />
      </div>
    </div>
  );
};

export default withRouter(PlayerBoard);
