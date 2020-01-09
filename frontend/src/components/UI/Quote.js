/** @jsx jsx */

import { Fragment, useState } from 'react';
import { jsx } from '@emotion/core';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardContainer from '../UI/CardContainer';
import CardContent from '../UI/CardContent';
import { createSlugFromName, sectorColor } from '../../helpers/util';
import { paragraph } from '../../style/text';
import { noWrapFlex } from '../../style/flex';
import { marginBottom } from '../../style/misc';
import { fonts } from '../../style/theme';
import { scale } from '../../style/scale';
import defaultImage from '../../static/images/eco-friendly.svg';

const quoteStyle = scale({
  borderRadius: '10px',
  backgroundColor: 'rgba(0,0,0,0.03)',
  padding: '20px 25px',
  margin: '10px auto',
});

const imgContainer = userImg =>
  scale({
    backgroundImage: `url(${userImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    height: '50px',
    width: '50px',
    borderRadius: '25px',
    marginRight: '10px',
  });

const tinyUser = scale({
  height: '50px',
  width: '50px',
});

const huge = scale({
  opacity: 0.8,
  fontSize: '24px',
  lineHeight: 0,
  fontWeight: 700,
});

const Quote = props => {
  const { quote, image, attribution, source } = props;
  return (
    <div css={quoteStyle}>
      <p css={paragraph}>
        <span css={huge}>“</span>
        {quote}
        <span css={huge}>”</span>
      </p>
      <br />
      <div css={noWrapFlex}>
        <div css={imgContainer(image || defaultImage)}>
          <div css={tinyUser} />
        </div>
        <div>
          <p css={marginBottom('0 !important')}>
            <strong>{attribution}</strong>
          </p>
          <a href={source} target="_blank">
            <p>Source</p>
          </a>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
