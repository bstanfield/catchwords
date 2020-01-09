/** @jsx jsx */

import { useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { colors, fonts, fontSizes } from '../../style/theme';

const darkener = css`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
`;

const modalStyle = css`
  position: fixed;
  border-radius: 5px;
  z-index: 99999;
  margin: auto;
  top: 5%;
  bottom: 80px;
  left: 5%;
  right: 5%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.backgroundWhite};
  max-width: 750px;
`;

const backLinkContainer = css`
  z-index: 999;
  position: sticky;
  top: 0;
  padding: 15px;
  i {
    float: right;
    font-size: ${fontSizes.large};
    color: rgba(0, 0, 0, 0.5);
    margin-right: 5px;
    margin-top: 0px;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    &:hover {
      opacity: 1;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
  }
`;

const backLink = css`
  width: fit-content;
  text-decoration: none;
  outline: none;
  transition: 0.3s;
  font-family: ${fonts.Sans};
  font-weight: 700;
  font-size: ${fontSizes.bodyLarge};
  padding: 5px 7px;
  border-radius: 3px;
  color: black;
  background-color: white;
  box-shadow: 0 1px 3px 0 #afafaf;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  &:hover {
    box-shadow: 0 1px 3px 0 #7c7c7c;
  }
`;

function Modal(props) {
  const { children } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = null;
    };
  }, []);

  const goBack = () => window.history.back();

  return (
    <div>
      <div css={modalStyle}>
        <div css={backLinkContainer}>
          <button onClick={() => goBack()} css={backLink} type="button">
            &#8592; Back
          </button>
        </div>
        {children}
      </div>
      <div css={darkener} onClick={() => goBack()} type="button" />
    </div>
  );
}

Modal.propTypes = {
  backLinkURL: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
