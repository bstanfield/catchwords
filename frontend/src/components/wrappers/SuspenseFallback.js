/** @jsx jsx */

import * as React from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { colors } from '../../style/theme';
import LoadingSpinner from '../UI/LoadingSpinner';
import { scale } from '../../style/scale';
import FadeInOut from './FadeInOut';

const loadingStyle = scale({
  margin: 'auto',
  textAlign: 'center',
});

const SuspenseFallback = ({ show }) => (
  <div css={loadingStyle}>
    <FadeInOut name="suspense" showFadeInOut={show} timeout={50}>
      <LoadingSpinner color={colors.hoverOrange} width="40px" speed="1000ms" />
    </FadeInOut>
  </div>
);

SuspenseFallback.propTypes = {
  show: PropTypes.bool,
};

SuspenseFallback.defaultProps = {
  show: false,
};

export default SuspenseFallback;
