/** @jsx jsx */

import { useEffect, useReducer, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import {
  colors,
  findCorrectGuesses,
  findIncorrectGuesses
} from '../helpers/util';
import socketIOClient from 'socket.io-client';

import Cards from '../components/Cards';
import Network from '../helpers/network';
import ThemeSelector from '../components/ThemeSelector';
import Tutorial from '../components/Tutorial';
import Button from '../components/Button';
import ToggleButton from '../components/ToggleButton';

const API_URL = 'https://catchwords-server.herokuapp.com/api';

const primaryContainer = scale({
  maxWidth: '1000px',
  color: colors.textPrimary,
  margin: 'auto',
  'h1, h2, h3, h4, p, a': {
    fontFamily: 'Work Sans, system-ui !important',
    margin: 0,
    fontWeight: 600
  },
  h4: {
    fontWeight: 500
  }
});

const topContainer = scale({
  position: 'relative',
  paddingTop: '12px',
  paddingBottom: '12px',
  marginBottom: '16px',
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const pageFade = scale({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.2)',
  width: '100vw',
  height: '100%',
  zIndex: 9999
});

const modal = scale({
  borderRadius: '6px',
  backgroundColor: 'white',
  padding: '20px 40px'
});

const turnButton = {
  color: colors.textPrimary,
  fontWeight: 500,
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '32px',
  marginLeft: '16px',
  fontSize: '22px',
  border: '1px solid',
  '&:hover': {
    opacity: 0.9
  }
};

const endTurnStyle = guesses =>
  scale({
    backgroundColor: guesses > 0 ? '#46F01B' : '#FFDA1B',
    borderColor: guesses > 0 ? '#34CA0F' : '#F0CE1B',
    boxShadow:
      guesses > 0
        ? '0px 4px 14px rgba(0, 255, 56, 0.44)'
        : '0px 4px 14px rgba(253, 198, 58, 1)'
  });

const waitingStyle = scale({
  backgroundColor: colors.buttonSimple,
  borderColor: colors.border,
  cursor: 'not-allowed'
});

const cheatsheetButton = isSelected =>
  scale({
    borderRadius: '32px'
  });

const buttonStyle = isSelected =>
  scale({
    fontWeight: 500,
    padding: '8px 18px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    margin: '20px 20px 20px 0',
    fontSize: '20px',
    color: isSelected ? colors.textPrimary : colors.textSecondary,
    backgroundColor: isSelected
      ? colors.buttonSimpleSelect
      : colors.buttonSimple,
    transition: 'all ease-in-out 100ms',
    '&:hover': {
      backgroundColor: isSelected
        ? colors.buttonSimpleSelect
        : colors.buttonSimpleHover,
      opacity: isSelected ? 0.9 : 1
    }
  });

const bottomBar = scale({
  display: 'flex',
  justifyContent: 'space-between'
});

const initialState = {
  words: [],
  id: '',
  localTurnCount: 1,
  showModal: false,
  currentTurnGuesses: 0,
  editWordsMode: false,
  refreshCard: 0,
  incorrectGuesses: [],
  guessingState: true, // false = word swap mode
  userTeam: null,
  redKey: [],
  blueKey: [],
  redGuesses: [],
  blueGuesses: [],
  correctRedGuesses: [],
  correctBlueGuesses: [],
  showCheatsheet: false
};

function boardReducer(state, action) {
  const swapWords = (state, action) => {
    state.words.splice(action.index, 1, action.word);
    return {
      ...state,
      words: state.words
    };
  };

  switch (action.type) {
    case 'update':
      return { ...state, ...action.state };
    case 'reset_turn_guesses':
      return { ...state, currentTurnGuesses: 0 };
    case 'increment_guesses':
      return { ...state, currentTurnGuesses: state.currentTurnGuesses + 1 };
    case 'increment_turn':
      return { ...state, localTurnCount: state.localTurnCount + 1 };
    case 'toggle_modal':
      return { ...state, showModal: !state.showModal };
    case 'toggle_swap_mode':
      return {
        ...state,
        editWordsMode: !state.editWordsMode,
        guessingState: !state.guessingState
      };
    case 'swap_word':
      return swapWords(state, action);
    case 'toggle_cheatsheet':
      return { ...state, showCheatsheet: !state.showCheatsheet };
    case 'set_team':
      return { ...state, userTeam: action.team };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

const inningRow = { display: 'flex', flexWrap: 'nowrap', alignItems: 'center' };

const inning = isCurrentInning => ({
  backgroundColor: isCurrentInning ? 'rgba(86, 150, 246, 0.12)' : 'transparent',
  color: isCurrentInning ? colors.textPrimary : colors.textSecondary,
  padding: '6px 12px',
  borderLeft: '1px solid',
  borderColor: colors.border,
  width: '40px',
  boxSizing: 'border-box',
  textAlign: 'center'
});

const inningText = {
  opacity: 0.4,
  fontWeight: 500,
  textTransform: 'uppercase',
  fontSize: '14px',
  width: 100
};

const loadBoard = async (boardId, dispatch) => {
  const [response, responseBody] = await Network.get(
    `get-existing-board/${boardId}`
  );
  const {
    words,
    red,
    blue,
    redGuesses,
    blueGuesses,
    turnCount,
    id
  } = responseBody;
  const allIncorrectGuesses = findIncorrectGuesses(
    red,
    blueGuesses || []
  ).concat(findIncorrectGuesses(blue, redGuesses || []));
  dispatch({
    type: 'update',
    state: {
      words,
      id,
      localTurnCount: turnCount,
      incorrectGuesses: allIncorrectGuesses,
      redKey: red,
      blueKey: blue,
      redGuesses: redGuesses || [],
      blueGuesses: blueGuesses || [],
      correctRedGuesses: findCorrectGuesses(blue, redGuesses || []),
      correctBlueGuesses: findCorrectGuesses(red, blueGuesses || [])
    }
  });
};

const updateBoard = async (boardId, dispatch) => {
  const [response, responseBody] = await Network.get(
    `get-existing-board/${boardId}`
  );
  const { red, blue, redGuesses, blueGuesses, turnCount, words } = responseBody;
  const allIncorrectGuesses = findIncorrectGuesses(
    red,
    blueGuesses || []
  ).concat(findIncorrectGuesses(blue, redGuesses || []));
  dispatch({
    type: 'update',
    state: {
      words,
      localTurnCount: turnCount,
      incorrectGuesses: allIncorrectGuesses,
      redGuesses: redGuesses || [],
      blueGuesses: blueGuesses || [],
      correctRedGuesses: findCorrectGuesses(blue, redGuesses || []),
      correctBlueGuesses: findCorrectGuesses(red, blueGuesses || [])
    }
  });
};

const PlayerBoard = ({ match }) => {
  // STATE -----
  // Board state
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [socketConnection, setSocketConnection] = useState(false);

  // END STATE -----

  const {
    localTurnCount,
    showModal,
    currentTurnGuesses,
    id,
    editWordsMode,
    refreshCard,
    userTeam,
    redKey,
    blueKey,
    redGuesses,
    blueGuesses,
    showCheatsheet
  } = state;

  useEffect(() => {
    console.log('creating connection!');
    // For local dev, back to: 'http://127.0.0.1:3333' below.
    const connection = socketIOClient(
      'https://catchwords-server.herokuapp.com'
    );
    setSocketConnection(connection);
    console.log('connection: ', connection);

    connection.emit('name', 'Ben');

    connection.on('reject', () => {
      window.location.href = `/`;
      console.log('here!');
    });

    connection.on('connect', () => {
      connection.emit('join', 'DELETE');
    });

    connection.on('reload', () => {
      updateBoard(match.params.id, dispatch);
    });

    connection.on('id', id => {
      console.log(id);

      console.log('here!');
    });
  }, []);

  // Loads board
  useEffect(() => {
    loadBoard(match.params.id, dispatch);
  }, [match.params.id]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updateBoard(match.params.id, dispatch);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    if (localTurnCount === 1) return;
    dispatch({ type: 'toggle_modal' });
  }, [localTurnCount, userTeam]);

  useEffect(() => {
    dispatch({
      type: 'update',
      state: {
        correctBlueGuesses: findCorrectGuesses(redKey, blueGuesses || []),
        correctRedGuesses: findCorrectGuesses(blueKey, redGuesses || [])
      }
    });
  }, [blueKey, redKey, redGuesses, blueGuesses]);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        dispatch({ type: 'toggle_modal' });
      }, 1500);
    }
  }, [showModal]);

  const isUserGivingClue =
    (localTurnCount % 2 === 0 && userTeam === 'blue') ||
    (localTurnCount % 2 === 1 && userTeam === 'red');

  const teamColor = userTeam === 'blue' ? '🔷' : '🔴';
  const turnText = (() => {
    if (!userTeam) {
      return 'Choose your team...';
    }
    if (showCheatsheet) {
      return `${teamColor} Viewing cheatsheet`;
    }
    if (isUserGivingClue) {
      return `${teamColor} Give a clue`;
    }
    return `${teamColor} It's your turn to guess`;
  })();

  // handle edit words
  const handleEditWords = () => {
    dispatch({ type: 'toggle_swap_mode' });
  };

  const handleAttemptGuess = index => {
    socketConnection.emit('guess', index);
    // Add socket event
    if (state.localTurnCount % 2 === 0) {
      // RED TEAM
      const newArr = state.redGuesses.concat([index]);
      dispatch({ type: 'update', state: { redGuesses: newArr } });
      Network.post('update-guesses', {
        id: state.id,
        team: 'red',
        guesses: newArr
      });
    } else {
      // BLUE TEAM
      const newArr = state.blueGuesses.concat([index]);
      dispatch({ type: 'update', state: { blueGuesses: newArr } });
      Network.post('update-guesses', {
        id: state.id,
        team: 'blue',
        guesses: newArr
      });
    }

    dispatch({ type: 'increment_guesses' });
  };

  const handleReplaceWord = async index => {
    const [response, responseBody] = await Network.get(
      `swap-word/${match.params.id}/${index}`
    );
    dispatch({
      type: 'swap_word',
      word: responseBody.word,
      index
    });
    socketConnection.emit('swapWord', index);
  };

  const Turns = ({ total, turnCount, className }) => {
    const totalDots = new Array(total).fill(false);
    const dotsWithId = totalDots.map((item, i) => i + 1);
    const redTurns = dotsWithId.filter((element, index) => {
      return index % 2 === 1;
    });
    const blueTurns = dotsWithId.filter((element, index) => {
      return index % 2 === 0;
    });
    return (
      <div className={className}>
        <div
          css={[
            inningRow,
            { borderBottom: '1px solid', borderColor: colors.borderColor }
          ]}
        >
          <p css={inningText}>Blue</p>
          {blueTurns.map(id => (
            <div css={inning(turnCount === id)}>
              {id < turnCount ? '✓' : '-'}
            </div>
          ))}
        </div>
        <div css={inningRow}>
          <p css={inningText}>Red turns</p>
          <div css={inningRow}>
            {redTurns.map(id => (
              <div css={inning(turnCount === id)}>
                {id < turnCount ? '✓' : '-'}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      css={{
        backgroundColor: showCheatsheet
          ? colors.backgroundEmphasis
          : colors.background,
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}
    >
      {!userTeam && (
        <div css={pageFade}>
          <div css={modal}>
            <h1 style={{ textAlign: 'center' }}>Join a team</h1>
            <button
              css={buttonStyle()}
              onClick={() => {
                // sets turn count to 1 and current turn guesses to none
                dispatch({ type: 'set_team', team: 'red' });
              }}
            >
              🔴 Red team
            </button>
            <button
              css={buttonStyle()}
              onClick={() => {
                // sets turn count to 1 and current turn guesses to none
                dispatch({ type: 'set_team', team: 'blue' });
              }}
            >
              🔷 Blue team
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div css={pageFade}>
          <div css={modal}>
            <p>Turn {localTurnCount}/7</p>
            <h1>{turnText}</h1>
          </div>
        </div>
      )}

      <div css={primaryContainer}>
        <div css={topContainer}>
          <h2 style={{ fontSize: 30, display: 'inline', marginRight: '20px' }}>
            {turnText}
          </h2>
          <div
            css={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <div
              id="turns"
              css={{
                backgroundColor: colors.background,
                padding: '4px 8px',
                borderRadius: 4
              }}
            >
              <Turns
                turnCount={localTurnCount}
                total={8}
                css={{ marginRight: 8 }}
              />
            </div>
            <div id="end-turn-btn">
              {!showCheatsheet && isUserGivingClue ? (
                <button css={[turnButton, waitingStyle]}>Waiting...</button>
              ) : !showCheatsheet ? (
                <button
                  css={[turnButton, endTurnStyle(currentTurnGuesses)]}
                  onClick={() => {
                    Network.post(`update-turn`, {
                      id,
                      turnCount: localTurnCount + 1
                    });
                    // Maybe this isn't needed anymore?
                    // dispatch({ type: 'increment_turn' });
                    dispatch({ type: 'reset_turn_guesses' });
                    socketConnection.emit('endTurn', currentTurnGuesses);
                  }}
                >
                  {isUserGivingClue ? 'Waiting...' : 'End turn'}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <Cards
          refreshCard={refreshCard}
          state={state}
          isUserGivingClue={isUserGivingClue}
          dispatch={dispatch}
          handleAttemptGuess={handleAttemptGuess}
          handleReplaceWord={handleReplaceWord}
        />

        {/* BOTTOM ACTIONS */}
        <div css={bottomBar}>
          <div css={{ display: 'flex' }}>
            {userTeam === 'red' ? (
              <button
                css={[
                  buttonStyle(showCheatsheet),
                  cheatsheetButton(showCheatsheet)
                ]}
                onClick={() => dispatch({ type: 'toggle_cheatsheet' })}
              >
                Red cheatsheet
              </button>
            ) : (
              <button
                css={[
                  buttonStyle(showCheatsheet),
                  cheatsheetButton(showCheatsheet)
                ]}
                onClick={() => dispatch({ type: 'toggle_cheatsheet' })}
              >
                Blue cheatsheet
              </button>
            )}

            <div id="edit-words-btn">
              <ToggleButton
                isSelected={editWordsMode}
                onClick={() => handleEditWords()}
              >
                Edit words
              </ToggleButton>
            </div>
          </div>
          <div css={{ display: 'flex' }}>
            <Tutorial
              state={state}
              toggleCheatsheet={() => dispatch({ type: 'toggle_cheatsheet' })}
            />
            <Link to="/new">
              <Button color="gray">New board →</Button>
            </Link>
          </div>
        </div>
        <ThemeSelector />
      </div>
    </div>
  );
};

export default withRouter(PlayerBoard);
