/** @jsx jsx */

import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import TooltipWrapper from './TooltipWrapper';
import { boldSup, noLineHeight } from '../../style/text';

export default function Citation(props) {
  const { title, children, number } = props;
  return (
    <TooltipWrapper
      title={title}
      onPageContent={<sup css={[boldSup, noLineHeight]}>{number}</sup>}
    >
      {children}
    </TooltipWrapper>
  );
}

Citation.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Citation.defaultProps = {
  title: '',
  number: '',
  children: undefined,
};
