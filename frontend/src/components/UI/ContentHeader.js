/** @jsx jsx */

import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { scale } from '../../style/scale';
import {
  mediumContainer,
  textContainer,
  headerImage,
} from '../../style/layout';
import { caption, smallCaps } from '../../style/text';
import { marginAuto } from '../../style/misc';
import {
  renderWhatever,
  makeMDYDateFromAnyDate,
  estimateReadingTime,
} from '../../helpers/util';
import HorizontalSeparator from '../UI/HorizontalSeparator';
import ContentTag from '../UI/ContentTag';

const descriptionStyle = scale({
  fontWeight: 500,
});

const ContentHeader = props => {
  const {
    category,
    title,
    description,
    authors,
    dateText,
    date,
    body,
    tags,
    imageUrl,
  } = props;
  return (
    <div css={[imageUrl ? mediumContainer : textContainer, marginAuto]}>
      <div css={textContainer}>
        <h4 css={smallCaps}>{category}</h4>
        <h1>{title}</h1>
        <p css={descriptionStyle}>{description}</p>
        <p css={caption}>
          By <span className="bold">{renderWhatever(authors)}</span> |{' '}
          {dateText}
          {makeMDYDateFromAnyDate(date)} · {estimateReadingTime(body)} minute
          read
        </p>
        {tags && R.map(tag => <ContentTag tag={tag} />, tags)}
      </div>
      <br />
      <br />
      {imageUrl && <div css={headerImage(imageUrl)} />}
      <br />
      <br />
      <HorizontalSeparator />
      <br />
    </div>
  );
};

ContentHeader.defaultProps = {
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  dateText: PropTypes.string,
  date: PropTypes.string,
  body: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
};

ContentHeader.propTypes = {
  category: '',
  title: '',
  description: '',
  authors: ['Mimi Tran Zambetti'],
  dateText: '',
  date: '',
  body: '',
  tags: [],
  imageUrl: '',
};

export default ContentHeader;
