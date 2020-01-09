/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { scale } from '../../style/scale';

const cardContent = long =>
  scale({
    padding: long ? ['10px 0px 0px 0px', '20px'] : '20px',
    marginBottom: long ? '-10px' : 'inherit',
  });

const CardContent = props => {
  const { children, longMessage } = props;
  return <div css={cardContent(longMessage)}>{children}</div>;
};

CardContent.defaultProps = {
  children: null,
  longMessage: false,
};

CardContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  longMessage: PropTypes.bool,
};

export default CardContent;
