/** @jsx jsx */

import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';

function Reset(props) {
  useEffect(() => {
    const handleResetGame = async () => {
      // removing redux
      // await props.ResetGame();
      props.history.push('/');
    };
    handleResetGame();
  }, [props]);

  return <div />;
}

Reset.defaultProps = {};

Reset.propTypes = {
  ResetGame: PropTypes.func.isRequired,
};

export default withRouter(Reset);
