/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useState, Fragment, useEffect } from 'react';
import { scrollToPosition, colors } from '../helpers/util';
import { scale } from '../style/scale';

const cardStyle = (isCollapsed, isShort) => scale({
  position: 'fixed',
  bottom: [0, 0, 50],
  left: [0, 0, 50],
  transition: isCollapsed
  ? 'all 150ms cubic-bezier(0.215, 0.61, 0.355, 1)'
  : 'all 260ms ease-in',
  height: isCollapsed ? 72 : isShort ? 240 : 360,
  borderRadius: 8,
  borderBottomLeftRadius: [0,0,8,8],
  borderBottomRightRadius: [0,0,8,8],
  backgroundColor: isCollapsed ? colors.buttonGreen : 'white',
  zIndex: 20000,
  boxShadow: `2px 2px 15px 1px ${colors.boxShadow}`,
  cursor: isCollapsed ? 'pointer' : 'auto',
  padding: isCollapsed ? '24px 30px' : '42px 0px 18px',
  display: 'flex',
  width: ['100%', '100%', 375, 375],
  flexDirection: 'column',
})

const pipContainer = scale({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 12,
})

const pip = filled => scale({
  height: 10,
  width: 10,
  borderRadius: 10,
  backgroundColor: filled ? colors.buttonGreen : colors.border,
  cursor: 'pointer',
  '&:not(:last-child)': {
    marginRight: 8
  }
})

const overlay = scale({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: 4000,
})

export default function Tour({
  steps,
  stepProps,
  exitTour
}) {
  const [stepNumber, setStepNumber] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const Step = steps[stepNumber].component;

  // Kinda hacky, but it works.
  useEffect(() => {
    document.querySelectorAll('.highlighted').forEach((element) => {
      element.classList.remove('highlighted');
    });

    if (steps[stepNumber].selector && !collapsed) {
      const nextNode = document.querySelector(steps[stepNumber].selector);
      nextNode.classList.add('highlighted');
      scrollToPosition(nextNode.getBoundingClientRect().top + window.scrollY);
    }

    return () => {
      document.querySelectorAll('.highlighted').forEach((element) => {
        element.classList.remove('highlighted');
      });
    };
  }, [stepNumber, collapsed]);

  const handleCollapse = () => {
    setCollapsed(true);
  };

  const handleClickCard = () => {
    if (collapsed) {
      setCollapsed(false);
    }
  };

  const handleContinue = () => {
    if (stepNumber + 1 !== steps.length) {
      setStepNumber((step) => step + 1);
    } else {
      exitTour()
    }
  };

  const handleClickPip = (stepNumber) => {
    setStepNumber(stepNumber);
  };

  return (
    <Fragment>
      {!collapsed && (
        <div css={overlay} id="overlay" onClick={handleCollapse} />
      )}
      {collapsed ? 
      (
      <div
          css={[
            cardStyle(collapsed, steps[stepNumber].isShort),
          ]}
          onClick={handleClickCard}
        >
          <h3 css={{color: colors.textLight, fontWeight: 500}}>Resume tutorial &rarr;</h3>
        </div>
      ) : (
        <div
          css={cardStyle(collapsed, steps[stepNumber].isShort)}
          onClick={handleClickCard}
        >
          <Step {...stepProps} onContinue={handleContinue} />
          <div css={pipContainer}>
            {steps.map((_, i) => (
              <div 
                css={pip(i <= stepNumber)}
                key={i}
                onClick={() => handleClickPip(i)}
              />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}
