/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { scale } from '../../style/scale';

const cardStyle = enableScaleOnHover =>
  scale({
    margin: 'auto',
    padding: 0,
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '100%',
    height: '100%',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.12)',
    webkitTransition: 'box-shadow 150ms ease',
    transition:
      'transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 150ms ease',
    '&:hover': {
      boxShadow: enableScaleOnHover && 'rgba(0, 0, 0, 0.1) 0px 1px 1rem',
      transform: enableScaleOnHover && 'scale(1.02, 1.02)',
      cursor: enableScaleOnHover && 'pointer',
    },
    '&:focus': {
      boxShadow: enableScaleOnHover && 'rgba(0, 0, 0, 0.1) 0px 1px 1rem',
      transform: enableScaleOnHover && 'scale(1.02, 1.02)',
      cursor: enableScaleOnHover && 'pointer',
    },
  });

const CardContainer = props => {
  const { children, enableScaleOnHover } = props;
  return <div css={cardStyle(enableScaleOnHover)}>{children}</div>;
};

CardContainer.defaultProps = {
  children: null,
  enableScaleOnHover: false,
};

CardContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  enableScaleOnHover: PropTypes.bool,
};

export default CardContainer;
