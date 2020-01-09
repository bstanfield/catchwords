/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { scale } from '../../style/scale';
import { fonts } from '../../style/theme';

const tagStyle = scale({
  fontFamily: fonts.Sans,
  fontWeight: 500,
  textTransform: 'uppercase',
  fontSize: '12px',
  borderRadius: '2px',
  backgroundColor: 'rgba(0,0,0,0.05)',
  width: 'fit-content',
  padding: '2px 6px 2px 6px',
  display: 'inline-block',
  marginRight: '10px',
});

const ContentTag = props => {
  const { tag } = props;
  return <div css={tagStyle}>{tag}</div>;
};

ContentTag.defaultProps = {
  tag: '',
};

ContentTag.propTypes = {
  tag: PropTypes.string,
};

export default ContentTag;
