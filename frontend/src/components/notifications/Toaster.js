/** @jsx jsx */
import { useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ClearToast, SetToast, DismissToast } from '../../actions/toaster';

import Toast from './Toast';

const Toaster = props => {
  const { toast } = props;
  const { show, text, type, isOnRight, buttonAction, buttonText } = toast;

  useEffect(() => {
    let timeout;
    if (show) {
      timeout = setTimeout(() => {
        props.DismissToast();
      }, 20000);
    }
    if (!show) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <TransitionGroup name="toaster">
      <Toast
        toastIn={show}
        text={text}
        duration={300}
        type={type}
        isOnRight={isOnRight}
        closeAction={() => {
          props.DismissToast();
        }}
        buttonAction={() => {
          buttonAction();
          props.DismissToast();
        }}
        buttonText={buttonText}
        isDismissable={!buttonAction}
      />
    </TransitionGroup>
  );
};

function mapStateToProps(state) {
  return {
    toast: state.toaster,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      SetToast,
      ClearToast,
      DismissToast,
    },
    dispatch
  );
}

Toaster.defaultProps = {
  toast: {
    text: 'I’m a toast',
    type: 'success',
    show: false,
    isOnRight: false,
  },
};

Toaster.propTypes = {
  DismissToast: PropTypes.func.isRequired,
  ClearToast: PropTypes.func.isRequired,
  toast: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.string,
    show: PropTypes.bool,
    isOnRight: PropTypes.bool,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
