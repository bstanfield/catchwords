/** @jsx jsx */

import { Transition } from 'react-transition-group';
import { css, jsx } from '@emotion/core';

const Darkener = ({ show, setShow }) => {
  const defaultStyle = {
    transition: 'opacity 400ms ease-in-out',
    opacity: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 2999,
  };
  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return (
    <Transition
      in={show}
      timeout={150}
      key="darkener"
      mountOnEnter
      unmountOnExit
    >
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Escape' && setShow) {
              setShow(false);
            } else {
              return;
            }
          }}
          onClick={() => {
            if (setShow) {
              setShow(false);
            } else {
              return;
            }
          }}
        />
      )}
    </Transition>
  );
};

export default Darkener;
