/** @jsx jsx */

import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import { fonts, colors, fontSizes } from '../../style/theme';
import { marginAuto, fitWidth } from '../../style/misc';
import {
  noWrapFlex,
  alignCenter,
  justifyContentCenter,
} from '../../style/flex';
import { scale } from '../../style/scale';
import LoadingSpinner from '../UI/LoadingSpinner';
import FadeInOut from '../wrappers/FadeInOut';

const loadingStyle = scale({
  marginRight: 5,
});

const buttonStyle = scale({
  fontFamily: fonts.Sans,
  fontWeight: 600,
  textAlign: 'center',
  backgroundColor: colors.highlightOrange,
  fontSize: fontSizes.button,
  color: 'white',
  borderRadius: '3px',
  border: `1px solid ${colors.highlightOrange}`,
  cursor: 'pointer',
  padding: ['4px 6px', '6px 8px'],
  width: '100%',
  minWidth: 'fit-content',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#EA9010',
    boxShadow: 'none',
  },
});

const mediumStyle = scale({
  padding: '10px 16px !important',
  fontSize: '12pt',
  minHeight: '20px',
});

const largeStyle = scale({
  padding: '13px 15px !important',
  fontSize: '12.5pt',
});

const greenStyle = scale({
  backgroundColor: colors.greenButton,
  border: `1px solid ${colors.greenButton}`,
  '&:hover': {
    backgroundColor: '#40a148',
  },
});

const invertedGreenStyle = scale({
  backgroundColor: 'transparent',
  border: '1px solid #49a650',
  color: '#49a650',
  transition: 'background-color 200ms ease-in-out',
  '&:hover': {
    backgroundColor: '#49a650',
    color: 'white',
  },
});

const redStyle = scale({
  backgroundColor: 'transparent',
  color: '#eb5857',
  border: '1px solid #f5a3a3',
  '&:hover': {
    backgroundColor: '#fdeeee',
  },
});

const grayStyle = scale({
  backgroundColor: 'transparent',
  color: '#373530',
  border: '1px solid #dfdfde',
  '&:hover': {
    backgroundColor: '#efefef',
  },
});

const blackStyle = scale({
  backgroundColor: '#000000',
  color: '#ffffff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#000000',
    opacity: 0.9,
  },
});

const Button = props => {
  const { text, onClickFn, submit, type, loading, size, children } = props;
  const [delayedLoad, setDelayedLoad] = useState(false);

  const colorStyleToApply =
    type === 'gray'
      ? grayStyle
      : type === 'red'
      ? redStyle
      : type === 'green'
      ? greenStyle
      : type === 'invertedGreen'
      ? invertedGreenStyle
      : type === 'black'
      ? blackStyle
      : null;

  const loadingColor =
    type === 'gray'
      ? '#373530'
      : type === 'red'
      ? '#eb5857'
      : type === 'green'
      ? 'white'
      : 'white';

  const sizeStyleToApply =
    size === 'medium' ? mediumStyle : size === 'large' ? largeStyle : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoad(loading);
    }, 50);
    return () => clearTimeout(timer);
  }, [loading]);

  if (submit || !onClickFn) {
    return (
      <button
        css={[buttonStyle, colorStyleToApply, sizeStyleToApply]}
        tabIndex={0}
        type="submit"
      >
        <div
          css={[
            noWrapFlex,
            alignCenter,
            justifyContentCenter,
            marginAuto,
            fitWidth,
          ]}
        >
          <TransitionGroup>
            <FadeInOut name="loading" showFadeInOut={delayedLoad} duration={50}>
              <div css={loadingStyle}>
                <LoadingSpinner color={loadingColor} width="12px" />
              </div>
            </FadeInOut>
          </TransitionGroup>
          {children || text}
        </div>
      </button>
    );
  }
  return (
    <button
      css={[buttonStyle, colorStyleToApply, sizeStyleToApply]}
      tabIndex={0}
      type="button"
      onClick={() => onClickFn()}
    >
      <div
        css={[
          noWrapFlex,
          alignCenter,
          justifyContentCenter,
          marginAuto,
          fitWidth,
        ]}
      >
        <TransitionGroup>
          <FadeInOut name="loading" showFadeInOut={loading} duration={50}>
            <div css={loadingStyle}>
              <LoadingSpinner color={loadingColor} width="12px" />
            </div>
          </FadeInOut>
        </TransitionGroup>
        {children || text}
      </div>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClickFn: PropTypes.func,
  submit: PropTypes.bool,
};

Button.defaultProps = {
  onClickFn: undefined,
  submit: false,
};

export default Button;
