/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Fragment, useEffect, useState } from 'react';
import { colors } from '../helpers/util';
import { scale } from '../style/scale';
import Button from './Button';
import ToggleButton from './ToggleButton';
import Tour from './Tour';

const contentWrapper = scale({
  padding: '0 32px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const heading = scale({
  textAlign: 'center',
  margin: 0,
  fontSize: 21,
  lineHeight: '25px',
  color: colors.textPrimary,
  marginBottom: '16px !important',
})

const description = scale({
  color: colors.textSecondary,
  fontSize: 16,
  fontWeight: '400 !important',
  lineHeight: '1.35em',
  textAlign: 'center',
});

const continueButton = scale({
  margin: 0,
  width: '90%',
})

function IntroStep(props) {
  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          Welcome to Catchwords, a cooperative word game for two or more players.
        </h4>
        <p css={description}>
          Both teams win if you can find all 15 green words in nine turns or less.
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Continue
      </Button>
    </div>
  );
}

function CheatsheetStep(props) {
  useEffect(() => {
    if (props.state.showCheatsheet === false) {
      props.toggleCheatsheet();
    } 
    return (() => props.toggleCheatsheet())
  }, []);

  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          A cheatsheet gives you 9 words to give clues for, and 3 words your partner must avoid.
        </h4>
        <p css={description}>
          A clue is only one word and one number, but it can point to multiple words that you want your partner to guess
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Continue
      </Button>
    </div>
  );
}

function TurnsStep(props) {
  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          There are nine turns in a game. Each turn has a clue and at least one guess. 
        </h4>
        <p css={description}>
          When your row is highlighted, it's your turn to guess, and the other team's turn to give a clue.
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Continue
      </Button>
    </div>
  );
}

function GuessesStep(props) {
  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          Guesses are made by clicking on the card(s) you believe matches the clue.
        </h4>
        <p css={description}>
          On a turn when you give the clue, your partner will make guesses.
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Continue
      </Button>
    </div>
  );
}

function EndTurn(props) {
  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          The guessing team decides when to end the turn.
        </h4>
        <p css={description}>
          Click “End Turn” once you’ve made your guesses, or as soon as you’ve made an incorrect guess.
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Continue
      </Button>
    </div>
  );
}

function EndingTheGame(props) {
  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          The game ends when you run into an assassin or once 9 turns have passed.
        </h4>
        <p css={description}>
          If both teams find all the words before you run out of turns, you both win :)
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Continue
      </Button>
    </div>
  );
}

function EditWords(props) {
  return (
    <div css={contentWrapper}>
      <div>
        <h4 css={heading}>
          Bonus: Editing the board
        </h4>
        <p css={description}>
          If the red and blue team would like to swap a word on the board with a different word, enter “Edit Words” mode and click on the card you’d like to remove.
        </p>
      </div>
      <Button onClick={props.onContinue} css={continueButton}>
        Exit Tutorial
      </Button>
    </div>
  );
}

export default function Tutorial(props) {
  const [showTour, toggleTour] = useState(false);

  return (
    <Fragment>
    {showTour && (
      <Tour
        title="tutorial"
        steps={[
          { component: IntroStep },
          { component: CheatsheetStep, selector: '#board' },
          { component: TurnsStep, selector: '#turns' },
          { component: GuessesStep, selector: '#first-card' },
          { component: EndTurn, selector: '#end-turn-btn' },
          { component: EndingTheGame },
          { component: EditWords, selector: '#edit-words-btn' },
        ]}
        exitTour={() => toggleTour(!showTour)}
        stepProps={{
          state: props.state,
          toggleCheatsheet: props.toggleCheatsheet
        }}
      />
    )}
      <ToggleButton
        isSelected={showTour}
        onClick={() => toggleTour(!showTour)}
      >
        {showTour ? 'Dismiss Tutorial' : 'Show Tutorial'}
      </ToggleButton>
    </Fragment>
  )
}
