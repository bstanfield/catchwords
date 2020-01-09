/** @jsx jsx */

import { Fragment, useState } from 'react';
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scale } from '../style/scale';
import { textContainer, mediumContainer } from '../style/layout';
import { dateInMilliseconds, fixedDecimal } from '../helpers/util';
import HorizontalSeparator from '../components/UI/HorizontalSeparator';
import { headerImage } from '../style/layout';

const About = props => {
  return (
    <div>
      <div css={textContainer}>
        <h1>About</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
