/** @jsx jsx */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { fonts, fontSizes, colors } from '../../style/theme';
import { childrenPropType } from '../../helpers/propTypes';
import { scale } from '../../style/scale';
import { marginRight } from '../../style/misc';

const sectionStyle = scale({
  fontSize: fontSizes.bodyLarge,
  cursor: 'pointer',
  outline: 'none',
  strong: {
    fontSize: [fontSizes.bodyLarge, fontSizes.bodyLarge, fontSizes.smallHeader],
    fontFamily: fonts.Sans,
    fontWeight: 600,
  },
});

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
    transform: 'translateY(0%)',
  },
  exited: {
    opacity: 0,
    transform: 'translateY(0%)',
  },
};

const flex = scale({
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
});

const ToggleList = ({ header, subheader, children, cta, isLarge }) => {
  const [showSection, toggleSection] = useState(false);
  return (
    <div key={header}>
      <div
        onClick={() => toggleSection(!showSection)}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            toggleSection(!showSection);
          }
        }}
        role="button"
        tabIndex={0}
        css={[sectionStyle, flex]}
      >
        <FontAwesomeIcon
          css={marginRight()}
          icon={showSection ? faAngleUp : faAngleDown}
        />
        {header}
      </div>
      <Transition
        in={showSection}
        timeout={100}
        key={header}
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
};

ToggleList.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: childrenPropType,
  cta: PropTypes.string,
  isLarge: PropTypes.bool,
};

ToggleList.defaultProps = {
  header: '',
  subheader: '',
  children: undefined,
  cta: '',
  isLarge: false,
};

export default ToggleList;
