/** @jsx jsx */

import { withRouter } from 'react-router-dom';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const LoadingSpinner = props => {
  const { color, width, speed } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={width}>
      <path
        opacity=".25"
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
        fill={color}
      />
      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" fill={color}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur={speed}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

LoadingSpinner.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  speed: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  color: undefined,
  width: '32px',
  speed: '0.8s',
};

export default withRouter(LoadingSpinner);
