/** @jsx jsx */

import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { triggerModal, getBoard, hitAPIEndpoint, findCorrectGuesses, findIncorrectGuesses } from '../helpers/util'

import Cards from '../components/Cards';

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
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [guessingState, setGuessingState] = useState(true); // false = word swap mdoe

  // Team state
  const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [redGuesses, setRedGuesses] = useState([]);
  const [blueGuesses, setBlueGuesses] = useState([]);
  const [correctRedGuesses, setCorrectRedGuesses] = useState([]);
  const [correctBlueGuesses, setCorrectBlueGuesses] = useState([]);

  const [showCheatsheet, setCheatsheet] = useState({ blue: false, red: false });
  // END STATE -----

  // Loads board
  useEffect(() => {
    const asyncFn = async () => {
      const genBoard = await (await getBoard(match.params.id)).json();
      const { words, red, blue, redGuesses, blueGuesses, turnCount, boardUrl } = genBoard[0];
      setBoard(words);
      setRedTeam(red);
      setBlueTeam(blue);
      setRedGuesses(redGuesses || []);
      setBlueGuesses(blueGuesses || []);
      const allIncorrectGuesses = findIncorrectGuesses(red, blueGuesses || []).concat(findIncorrectGuesses(blue, redGuesses || []));
      setIncorrectGuesses(allIncorrectGuesses);
      setCorrectRedGuesses(findCorrectGuesses(blue, redGuesses || []));
      setCorrectBlueGuesses(findCorrectGuesses(red, blueGuesses || []));
      setUrl(boardUrl);
      setLocalTurnCount(turnCount);
    }
    asyncFn();
  }, [match.params.id]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const genBoard = await (await getBoard(match.params.id)).json();
      const { red, blue, redGuesses, blueGuesses, turnCount } = genBoard[0];
      setRedGuesses(redGuesses || []);
      setBlueGuesses(blueGuesses || []);
      const allIncorrectGuesses = findIncorrectGuesses(red, blueGuesses || []).concat(findIncorrectGuesses(blue, redGuesses || []));
      setIncorrectGuesses(allIncorrectGuesses);
      setCorrectRedGuesses(findCorrectGuesses(blue, redGuesses || []));
      setCorrectBlueGuesses(findCorrectGuesses(red, blueGuesses || []));
      setLocalTurnCount(turnCount);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [match.params.id]);

  useEffect(() => {
    if (localTurnCount === 1) return;
    triggerModal(setShowModal);
  }, [localTurnCount]);

  useEffect(() => {
    setCorrectBlueGuesses(findCorrectGuesses(redTeam, blueGuesses || []));
    setCorrectRedGuesses(findCorrectGuesses(blueTeam, redGuesses || []));
  }, [blueTeam, redTeam, redGuesses, blueGuesses]);

  return (
    <div>
      {showModal &&
        <div css={pageFade}>
          <div css={modal}>
            <h1>{localTurnCount % 2 === 0 ? "🔷 Blue: Give a clue!" : "🔴 Red: Give a clue!"}</h1>
          </div>
        </div>
      }
      <div css={primaryContainer}>
        <div css={topContainer}>
          <h2 style={{ fontSize: 30, display: 'inline', marginRight: '20px' }}>{localTurnCount % 2 === 0 ? "🔷 Blue: Give a clue!" : "🔴 Red: Give a clue!"} </h2>
          <strong><p style={{ position: 'absolute', top: 20, right: 160, opacity: 0.7 }}>Turn #{localTurnCount}</p></strong>
          <button css={absolutePassTurn(currentTurnGuesses)} onClick={() => {
            hitAPIEndpoint('post', `update-turn`, {
              board_url: url,
              turn_count: localTurnCount + 1,
            });
            setLocalTurnCount(localTurnCount + 1);
            setCurrentTurnGuesses(0);
          }}>End turn</button>
        </div>
        {/* <div css={genericFlex}>{board.map((item, index) => RenderCard(item, index))}</div> */}
          <Cards
            refreshCard={refreshCard} 
            state={{
            board, localTurnCount, showModal, currentTurnGuesses, url,
            selectedCards, showRemove, refreshCard, correctBlueGuesses, correctRedGuesses,
            redTeam, blueTeam, blueGuesses, redGuesses, showCheatsheet, incorrectGuesses, guessingState
            }} 
            modifiers={{
            setCorrectBlueGuesses, setCorrectRedGuesses, setBlueGuesses, 
            setRedGuesses, setCurrentTurnGuesses, setBoard, triggerRefreshCard
           }}
        />
        <button css={buttonStyle(showCheatsheet.red)} onClick={() => { showCheatsheet.red === false ? setCheatsheet({ blue: false, red: true }) : setCheatsheet({ blue: false, red: false }) }} >
          <span role="img" aria-label="Red circle">🔴</span> Red cheatsheet
        </button>
        <button css={buttonStyle(showCheatsheet.blue)} onClick={() => { showCheatsheet.blue === false ? setCheatsheet({ blue: true, red: false }) : setCheatsheet({ blue: false, red: false }) }} >
          <span role="img" aria-label="Blue diamond">🔷</span> Blue cheatsheet
        </button>
        <button css={buttonStyle(showRemove)} onClick={() => { 
          if (showRemove === false) {
            setShowRemove(true)
            setGuessingState(false)
          } else {
            setShowRemove(false)
            setGuessingState(true)
          }
          }} >
          Edit words
        </button>
        <button css={buttonStyle(showRemove)} onClick={() => { 
            // sets turn count to 1 and current turn guesses to none
            hitAPIEndpoint('post', `update-turn`, {
              board_url: url,
              turn_count: 1,
            });
            setCurrentTurnGuesses(0);

            // resets player guesses
            hitAPIEndpoint('post', `update-guesses`, {
              board_url: url,
              team: 'red',
              guesses: []
            });
            hitAPIEndpoint('post', `update-guesses`, {
              board_url: url,
              team: 'blue',
              guesses: []
            });
          }} >
          Reset answers
        </button>
        <a href="/new"><button css={buttonStyle(showRemove)}>
          New board
        </button></a>
      </div>
    </div>
  );
};

export default withRouter(PlayerBoard);
