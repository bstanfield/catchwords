/** @jsx jsx */

import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import TooltipWrapper from './TooltipWrapper';
import { scale } from '../../style/scale';
import questionMark from '../../static/images/question-mark.png';

const bodyStyle = scale({
  overflowWrap: 'break-word',
  a: {
    color: '#333333',
    textDecoration: 'underline',
  },
});

const definition = scale({
  color: 'inherit',
  paddingLeft: '3px',
  paddingRight: '3px',
  textDecoration: 'underline',
  textDecorationColor: 'lightgrey',
  textDecorationSkip: 'auto',
});

const icon = scale({
  display: 'inline-block',
  width: '15px',
  marginRight: '5px',
});

export default function Tooltip(props) {
  const { body, title, children, plain } = props;

  return plain ? (
    <TooltipWrapper plain title={title} onPageContent={<div>{children}</div>} />
  ) : (
    <TooltipWrapper
      title={title}
      onPageContent={
        <span>
          <span css={definition}>{children}</span>
          <img css={icon} alt="definition" src={questionMark} />
        </span>
      }
    >
      <div css={bodyStyle} dangerouslySetInnerHTML={{ __html: body }} />
    </TooltipWrapper>
  );
}

Tooltip.propTypes = {
  body: PropTypes.string,
  title: PropTypes.string,
  plain: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Tooltip.defaultProps = {
  body: '',
  title: '',
  plain: false,
  children: undefined,
};
