/** @jsx jsx */

import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { css, jsx } from '@emotion/core';
import { colors } from '../../style/theme';
import { childrenPropType } from '../../util/propTypes';

// TOGGLE STYLES

const defaultStyle = {
  transition: 'opacity 50ms ease-in-out, transform 100ms ease-in-out',
  opacity: 0,
  transform: 'translateY(-5%)',
};

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateY(-2%)',
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0%)',
  },
  exiting: {
    opacity: 0,
    transform: 'translateY(-2%)',
  },
  exited: {
    opacity: 0,
    transform: 'translateY(0%)',
  },
};

const SlideOut = ({ name, duration, children, showSlideOut }) => (
  <div key={name}>
    <Transition
      in={showSlideOut}
      timeout={duration}
      key={name}
      mountOnEnter
      unmountOnExit
    >
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  </div>
);

SlideOut.propTypes = {
  name: PropTypes.string,
  showSlideOut: PropTypes.bool,
  children: childrenPropType,
  duration: PropTypes.number,
};

SlideOut.defaultProps = {
  name: '',
  showSlideOut: false,
  children: undefined,
  duration: 100,
};

export default SlideOut;
