/** @jsx jsx */

import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { scale } from '../style/scale';
import { contentContainer } from '../style/layout';
import { maxWidth, marginAuto } from '../style/misc';
import {
  genericFlex,
  flexUntilMobile,
  justifyContentStart,
} from '../style/flex';

import HorizontalSeparator from '../components/UI/HorizontalSeparator';

import { sortContentByDate } from '../helpers/util';

const cardContainer = scale({
  width: '250px',
  height: '150px',
  border: '1px solid #333333',
});

const Card = (props) => {
  const {name, index} = props;
  return <div css={cardContainer} key={index}></div>;
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
