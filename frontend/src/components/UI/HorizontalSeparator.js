/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../../style/scale';

const separator = scale({
  width: '100%',
  height: '1px',
  backgroundColor: 'rgba(0,0,0,0.1)',
});

const HorizontalSeparator = () => <div css={separator} />;

export default HorizontalSeparator;
