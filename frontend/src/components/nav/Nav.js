/** @jsx jsx */

import { Fragment, useState } from 'react';
import { jsx, css } from '@emotion/core';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scale } from '../../style/scale';
import { colors, fontSizes, fonts } from '../../style/theme';
import { noStyleLink } from '../../style/text';
import { genericFlex, alignItemsBaseline } from '../../style/flex';
import { hideOnMobile } from '../../style/misc';
import HorizontalSeparator from '../UI/HorizontalSeparator';

const biggestContainer = scale({
  width: '100%',
  background: ' rgb(250,250,250)',
  background: [
    'rgb(250,250,250)',
    'rgb(250,250,250)',
    'linear-gradient(90deg, rgba(250,250,250,0) 0%, rgba(250,250,250,1) 10%, rgba(250,250,250,1) 90%, rgba(250,250,250,0) 100%)',
  ],
});

const outerContainer = scale({
  maxWidth: '1050px',
  margin: 'auto',
  marginTop: 0,
});

const innerContainer = scale({
  maxWidth: '1020px',
  paddingTop: '12px',
  paddingLeft: '12px',
  margin: 'auto',
  marginBottom: '0',
});

const linkStyle = scale({
  textDecoration: 'none !important',
  fontFamily: 'system-ui',
  fontWeight: 500,
  marginRight: '10px',
  outline: 'none',
  transition: '300ms background-color, 200ms color',
  fontSize: '14px',
  padding: '4px 6px 1px 6px',
  borderRadius: '2px',
  color: '#5c5c5c',
  '&:hover': {
    color: '#333333',
    backgroundColor: 'rgb(0, 0, 0, 0.08)',
  },
  '&:focus': {
    color: '#333333',
    backgroundColor: 'rgb(0, 0, 0, 0.08)',
  },
  '&:active': {
    color: '#333333',
    backgroundColor: 'none',
  },
});

const homeLink = scale({
  color: colors.primaryRed,
  fontFamily: fonts.PublicoBold,
});

const Nav = props => {
  const {} = props;

  return (
    <div css={biggestContainer}>
      <div css={outerContainer}>
        <div css={[innerContainer, genericFlex, alignItemsBaseline]}>
          <Link to="/" css={noStyleLink}>
            <h4 css={homeLink}>catchwords</h4>
          </Link>
          <div css={genericFlex}>
            <Link to="/" css={[noStyleLink, linkStyle]}>
              Main Board
            </Link>
            <Link to="/game-master-1" css={[noStyleLink, linkStyle]}>
              Master (Red team)
            </Link>
            <Link to="/game-master-2" css={[noStyleLink, linkStyle]}>
              Master (Blue team)
            </Link>
          </div>
        </div>
        <HorizontalSeparator />
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
