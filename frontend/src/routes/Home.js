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

const headerDivider = scale({
  marginTop: ['10px', '10px', '20px'],
  marginBottom: ['20px', '20px', '40px'],
});

const Home = () => {
  return (
    <div>
      <div css={[contentContainer, marginAuto]}>
        <h2>Welcome to catchwords</h2>
      </div>
      <div css={headerDivider}></div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
