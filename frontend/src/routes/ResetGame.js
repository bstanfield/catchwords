/** @jsx jsx */

import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResetGame } from '../actions/game';

function Reset(props) {
  useEffect(() => {
    const handleResetGame = async () => {
      await props.ResetGame();
      props.history.push('/');
    };
    handleResetGame();
  }, [props]);

  return <div />;
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ResetGame,
    },
    dispatch
  );
}

Reset.defaultProps = {};

Reset.propTypes = {
  ResetGame: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reset));
