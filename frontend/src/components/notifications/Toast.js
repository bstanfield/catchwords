/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { colors, fonts, fontSizes } from '../../style/theme';
import checkmark from '../../static/checkmark.svg';
import alert from '../../static/alert.svg';
import { scale } from '../../style/scale';

const toastStyle = css`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.4);
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  p {
    font-size: ${fontSizes.body};
    margin-right: 10px;
  }
`;

const toastContentStyle = css`
  max-width: 450px;
  padding: 20px;
  display: flex;
  min-width: 200px;
  width: fit-content;
  justify-content: flex-start;
  align-items: center;
`;

const buttonStyle = css`
  color: ${colors.primaryText};
  padding: 3px 5px;
  font-family: ${fonts.Sans};
  font-size: ${fontSizes.caption};
  border: 1px solid ${colors.highlightOrange};
  background-color: ${colors.highlightOrange};
  color: white;
  border-radius: 4px;
  transition: 0.3;
  text-align: center;
  width: fit-content;
  display: inline;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  margin-right: 5px;
  :hover {
    border: 1px solid ${colors.hoverOrange};
    color: ${colors.hoverOrange};
    background-color: white;
    cursor: pointer;
  }
`;

const buttonWrapper = scale({
  marginTop: '5px',
});

const dismissStyle = css`
  border: 1px solid #dedede;
  color: ${colors.lightBorder};
  background-color: white;
  :hover {
    color: ${colors.primaryText};
    border: 1px solid #ccc;
  }
`;

const typeIconStyle = css`
  width: 20px;
  margin-right: 15px;
  margin-top: 3px;
`;

const textStyle = css`
  max-width: 200px;
`;

const duration = 300;

const transitionStyles = {
  entering: { opacity: 0, transform: 'none' },
  entered: { opacity: 1, transform: 'translate(0px, -60px)' },
  exiting: { opacity: 0, transform: 'none' },
  exited: { opacity: 0, transform: 'none' },
};

const Toast = props => {
  const {
    toastIn,
    text,
    buttonText,
    buttonAction,
    closeAction,
    type,
    isDismissable,
    isOnRight,
  } = props;
  const toastTypeIcon = () => {
    if (type === 'success') {
      return checkmark;
    }
    if (type === 'alert') {
      return alert;
    }
    return undefined;
  };
  const defaultStyle = scale({
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
    opacity: 0,
    position: 'fixed',
    bottom: ['10px', '-30px', '-30px', '-30px'],
    left: !isOnRight
      ? ['0px', '30px', '30px', '30px']
      : ['0px', 'auto', 'auto', 'auto'],
    right: isOnRight
      ? ['0px', '75px', '75px', '75px']
      : ['0px', 'auto', 'auto', 'auto'],
    zIndex: 1000000,
    maxWidth: ['90%', 'fit-content', 'fit-content', 'fit-content'],
    margin: ['auto', '0', '0', '0'],
  });
  return (
    <Transition
      in={toastIn}
      timeout={duration}
      key={text}
      mountOnEnter
      unmountOnExit
    >
      {state => (
        <div style={transitionStyles[state]} css={defaultStyle}>
          <div css={toastStyle}>
            <div
              css={css`
                ${toastContentStyle};
                align-items: ${buttonText && 'flex-start'};
              `}
            >
              <img css={typeIconStyle} src={toastTypeIcon()} alt={type} />
              <div>
                <p css={textStyle}>{text}</p>
                {buttonText && (
                  <div css={buttonWrapper}>
                    <div
                      css={buttonStyle}
                      role="button"
                      tabIndex={0}
                      onClick={() => buttonAction()}
                      onKeyDown={() => buttonAction()}
                    >
                      {buttonText}
                    </div>
                    <div
                      css={[buttonStyle, dismissStyle]}
                      role="button"
                      tabIndex={0}
                      onClick={() => buttonAction()}
                      onKeyDown={() => buttonAction()}
                    >
                      Dismiss
                    </div>
                  </div>
                )}
              </div>
              {isDismissable && (
                <div
                  css={[buttonStyle, dismissStyle]}
                  role="button"
                  tabIndex={0}
                  onClick={() => closeAction()}
                  onKeyDown={() => closeAction()}
                >
                  Dismiss
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

Toast.defaultProps = {
  text: '',
  buttonText: '',
  buttonAction: undefined,
  closeAction: undefined,
  type: undefined,
  isDismissable: false,
  toastIn: false,
  isOnRight: false,
};

Toast.propTypes = {
  text: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  closeAction: PropTypes.func,
  type: PropTypes.string,
  isDismissable: PropTypes.bool,
  toastIn: PropTypes.bool,
  isOnRight: PropTypes.bool,
};

export default Toast;
