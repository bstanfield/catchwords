/** @jsx jsx */

import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { scale } from '../style/scale';
import { triggerModal, replaceWord, getBoard, attemptGuess, hitAPIEndpoint } from '../helpers/util'

import {
  genericFlex,
} from '../style/flex';

import Card from '../components/Card';

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

const findCorrectGuesses = (teamBoard, teamGuesses) => {
  return teamGuesses.filter(
    guess => teamBoard[guess] === 1
  )
}

const findIncorrectGuesses = (teamBoard, teamGuesses) => {
  const incorrect = teamGuesses.filter(
    guess => teamBoard[guess] === 2
  )
  console.log(`found these: `, incorrect);
  return incorrect;
}

const PlayerBoard = ({ match }) => {
  // STATE -----
  // Board state
  const [board, setBoard] = useState([]);
  const [url, setUrl] = useState('');
  const [localTurnCount, setLocalTurnCount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentTurnGuesses, setCurrentTurnGuesses] = useState(0);

  // Card state
  const [selectedCards, setSelectedCards] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [refreshCard, triggerRefreshCard] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);

  // Team state
  const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [blueGuesses, setBlueGuesses] = useState([]);
  const [redGuesses, setRedGuesses] = useState([]);
  const [showCheatsheet, setCheatsheet] = useState({ blue: false, red: false });
  const [correctGuessesByBlueTeam, setCorrectGuessesByBlueTeam] = useState([]);
  const [correctGuessesByRedTeam, setCorrectGuessesByRedTeam] = useState([]);
  // END STATE -----

  // Loads board
  useEffect(() => {
    const asyncFn = async () => {
      const genBoard = await (await getBoard(match.params.id)).json();
      const { words, playerOne, playerTwo, playerOneGuesses, playerTwoGuesses, turnCount, boardUrl } = genBoard[0];
      setBoard(words);
      setRedTeam(playerOne);
      setBlueTeam(playerTwo);
      setBlueGuesses(playerTwoGuesses || []);
      setRedGuesses(playerOneGuesses || []);
      setCorrectGuessesByBlueTeam(findCorrectGuesses(playerTwo, playerTwoGuesses || []));
      setCorrectGuessesByRedTeam(findCorrectGuesses(playerOne, playerOneGuesses || []));
      const allIncorrectGuesses = findIncorrectGuesses(playerTwo, playerTwoGuesses || []).concat(findIncorrectGuesses(playerOne, playerOneGuesses || []));
      console.log('all incorrect guesses: ', allIncorrectGuesses)
      setIncorrectGuesses(allIncorrectGuesses);
      setUrl(boardUrl);
    }
    asyncFn();
  }, [match.params.id]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const genBoard = await (await getBoard(match.params.id)).json();
      const { words, playerOne, playerTwo, playerOneGuesses, playerTwoGuesses, turnCount } = genBoard[0];
      setBlueGuesses(playerTwoGuesses || []);
      setRedGuesses(playerOneGuesses || []);
      setCorrectGuessesByBlueTeam(findCorrectGuesses(playerTwo, playerTwoGuesses || []));
      setCorrectGuessesByRedTeam(findCorrectGuesses(playerOne, playerOneGuesses || []));
      const allIncorrectGuesses = findIncorrectGuesses(playerTwo, playerTwoGuesses || []).concat(findIncorrectGuesses(playerOne, playerOneGuesses || []));
      console.log('all incorrect guesses: ', allIncorrectGuesses)
      setIncorrectGuesses(allIncorrectGuesses);
      setLocalTurnCount(turnCount);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [match.params.id]);

  useEffect(() => {
    if (localTurnCount === 1) return;
    triggerModal(setShowModal);
  }, [localTurnCount]);

  const RenderCard = (cardName, index) => (
    <Card
      key={index}
      refreshCard={refreshCard}
      name={cardName}
      index={index}
      blueTeam={blueTeam}
      redTeam={redTeam}
      showCheatsheet={showCheatsheet}
      removeState={showRemove}
      redGuesses={redGuesses}
      blueGuesses={blueGuesses}
      correctGuesses={correctGuesses}
      correctGuessesByBlueTeam={correctGuessesByBlueTeam}
      correctGuessesByRedTeam={correctGuessesByRedTeam}
      incorrectGuesses={incorrectGuesses}
      turnCount={localTurnCount}
      guessCard={() => {
        attemptGuess(
          index,
          {
            board, localTurnCount, showModal, currentTurnGuesses, url,
            selectedCards, showRemove, refreshCard, correctGuesses,
            redTeam, blueTeam, blueGuesses, redGuesses, showCheatsheet,
            correctGuessesByBlueTeam, correctGuessesByRedTeam
          },
          {
            setCorrectGuesses, setBlueGuesses, setRedGuesses,
            setCorrectGuessesByBlueTeam, setCorrectGuessesByRedTeam
          }
        );
        setCurrentTurnGuesses(currentTurnGuesses + 1);
      }}
      replaceWord={() => {
        replaceWord(index, match.params.id, board, { setBoard, refreshCard, triggerRefreshCard });
      }}
    />
  );


  return (
    <div>
      {showModal &&
        <div css={pageFade}>
          <div css={modal}>
            <h1>{localTurnCount % 2 === 0 ? "🔷 Blue Leader: Give a clue!" : "🔴 Red Leader: Give a clue!"}</h1>
          </div>
        </div>
      }
      <div css={primaryContainer}>
        <div css={topContainer}>
          <h2 style={{ fontSize: 30, display: 'inline', marginRight: '20px' }}>{localTurnCount % 2 === 0 ? "🔷 Blue Leader: Give a clue!" : "🔴 Red Leader: Give a clue!"} </h2>
          <strong><p style={{ position: 'absolute', top: 20, right: 160, opacity: 0.7 }}>Turn #{localTurnCount}</p></strong>
          <button css={absolutePassTurn(currentTurnGuesses)} onClick={() => {
            setLocalTurnCount(localTurnCount + 1)
            hitAPIEndpoint('post', `update-turn`, {
              board_url: url,
              turn_count: localTurnCount,
            });
            setCurrentTurnGuesses(0);
          }}>End turn</button>
        </div>
        <div css={genericFlex}>{R.addIndex(R.map)(RenderCard, board)}</div>
        <button css={buttonStyle(showCheatsheet.red)} onClick={() => { showCheatsheet.red === false ? setCheatsheet({ blue: false, red: true }) : setCheatsheet({ blue: false, red: false }) }} >
          <span role="img" aria-label="Red circle">🔴</span> Red leader cheatsheet
        </button>
        <button css={buttonStyle(showCheatsheet.blue)} onClick={() => { showCheatsheet.blue === false ? setCheatsheet({ blue: true, red: false }) : setCheatsheet({ blue: false, red: false }) }} >
          <span role="img" aria-label="Blue diamond">🔷</span> Blue leader cheatsheet
        </button>
        <button css={buttonStyle(showRemove)} onClick={() => { showRemove === false ? setShowRemove(true) : setShowRemove(false) }} >
          Edit words
        </button>
      </div>
    </div>
  );
};

export default withRouter(PlayerBoard);
