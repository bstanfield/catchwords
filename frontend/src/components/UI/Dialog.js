/** @jsx jsx */

import { useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { scale } from '../../style/scale';
import Darkener from '../UI/Darkener';
import CardContainer from '../UI/CardContainer';
import FadeInOut from '../wrappers/FadeInOut';
import { colors, fonts, fontSizes } from '../../style/theme';

const dialogStyle = scale({
  position: 'fixed',
  minHeight: 'fit-content',
  maxWidth: ['90%', '90%', 'none'],
  MozAppearanceMinHeight: 'fit-content',
  WebkitAppearanceMinHeight: 'fit-content',
  width: 'fit-content',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: 'transparent',
  minWidth: 300,
  zIndex: 3000,
  borderRadius: '5px',
});

const dialogInnerContainer = hasBeigeBg =>
  scale({
    position: 'relative',
    MozAppearanceMinHeight: 'fit-content',
    WebkitAppearanceMinHeight: 'fit-content',
    maxHeight: '80vh',
    width: '100%',
    overflowY: 'auto',
    backgroundColor: hasBeigeBg && colors.backgroundWhite,
  });

const backLinkContainer = scale({
  zIndex: 999,
  position: 'sticky',
  top: 0,
  paddingTop: '15px',
  paddingLeft: '15px',
});

const backLink = scale({
  width: 'fit-content',
  textDecoration: 'none',
  transition: '0.3s',
  padding: '5px 7px',
  borderRadius: '3px',
  color: 'black',
  backgroundColor: 'white',
  fontSize: '16px',
  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.2)',
  cursor: 'pointer',
  WebkitTransition: 'box-shadow 150ms ease',
  transition: 'box-shadow 150ms ease',
  '&:hover': {
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.3)',
  },
});

function Dialog(props) {
  const {
    children,
    setShowDialog,
    showDialog,
    id,
    hasBeigeBg,
    withBackButton,
  } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = null;
    };
  }, []);

  return (
    <TransitionGroup>
      <div css={dialogStyle} id={id}>
        <FadeInOut
          name="dialog"
          duration={100}
          showFadeInOut={showDialog}
          zIndex={9999}
        >
          <CardContainer>
            <div css={dialogInnerContainer(hasBeigeBg)}>
              {withBackButton && (
                <div css={backLinkContainer}>
                  <button
                    onClick={() => setShowDialog(!showDialog)}
                    css={backLink}
                    type="button"
                  >
                    <h4>&#8592; Back</h4>
                  </button>
                </div>
              )}
              {children}
            </div>
          </CardContainer>
        </FadeInOut>
      </div>
      <Darkener setShow={setShowDialog} show={showDialog} />
    </TransitionGroup>
  );
}

Dialog.propTypes = {
  backLinkURL: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dialog;
