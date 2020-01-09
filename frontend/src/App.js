/** @jsx jsx */

import { Global, css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import Toaster from './components/notifications/Toaster';
import { colors, fonts, fontSizes } from './style/theme';
import { body } from './style/layout';
import { scale } from './style/scale';
import { mq } from './style/scale';
import Nav from './components/nav/Nav';
import Footer from './components/nav/Footer';

const globalStyles = css`
  @font-face {
    font-family: 'PublicoText-Bold';
    src: url('./static/PublicoText-Bold.otf') format('otf');
  }

  @font-face {
    font-family: 'PublicoText-Semibold';
    src: url('./static/PublicoText-Semibold.otf') format('otf');
  }

  @font-face {
    font-family: 'AtlasGrotesk-Regular';
    src: url('./static/AtlasGrotesk-Regular.woff') format('woff'),
      url('./static/AtlasGrotesk-Regular.otf') format('otf');
  }

  @font-face {
    font-family: 'AtlasGrotesk-Medium';
    src: url('./static/AtlasGrotesk-Medium.otf') format('otf');
  }

  body,
  html {
    font-family: 'AtlasGrotesk-Regular', -apple-system, BlinkMacSystemFont,
      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    color: ${colors.primaryText};
    background-color: ${colors.backgroundWhite};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  * {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-weight: default;
    letter-spacing: normal;
  }

  .animate {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .pageHeader {
    font-size: 35px;
    line-height: 45px;
    font-weight: 700;
    margin: auto;
    padding-bottom: 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0px;
  }

  h1 {
    ${mq({
      fontSize: ['23px', '30px', '30px', '35px'],
      lineHeight: ['30px', '35px', '35px', '45px'],
      // fontFamily: fonts.Sans,
      margin: 'auto',
      marginBottom: '10px',
    })};
  }

  h1 {
    ${mq({
      fontSize: ['26px', '36px', '36px', '42px'],
      lineHeight: ['30px', '45px', '45px', '50px'],
      fontFamily: fonts.PublicoBold,
      marginBottom: '10px',
      color: '#252729',
      color: colors.primaryRed,
    })};
  }

  h2 {
    ${mq({
      fontSize: ['20px', '25px'],
      lineHeight: ['28px', '35px'],
      fontFamily: fonts.PublicoSemibold,
      fontWeight: 500,
      marginBottom: '5px',
    })};
  }

  h3 {
    ${mq({
      fontSize: ['18px', '20px'],
      lineHeight: ['25px', '30px'],
      fontWeight: 600,
      marginBottom: '10px',
      fontFamily: fonts.Sans,
    })};
  }

  h4 {
    ${mq({
      fontSize: ['16px', '18px'],
      lineHeight: ['20px', '22px'],
      marginBottom: '10px',
      fontFamily: fonts.Sans,
      fontWeight: 600,
    })};
  }

  h5 {
    ${mq({
      fontSize: ['11.5px', '14px'],
      color: '#999',
      textTransform: 'uppercase',
      letterSpacing: ['0.5px', '1px'],
      fontWeight: [600, 700],
      fontFamily: fonts.Sans,
      marginBottom: '5px',
    })};
  }

  p {
    ${mq({
      fontFamily: fonts.Sans,
      fontSize: ['15px', '18px'],
      lineHeight: ['25px', '30px'],
      color: '#34393b',
      marginBottom: '10px',
      li: {
        marginBottom: '10px',
      },
    })};
  }

  sub {
    font-size: 70%;
    font-weight: 600;
    line-height: 0;
  }

  .box {
    background-color: white;
    border: 1px solid #eee;
    padding: 10px;
  }

  .flex-it {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  strong {
    font-weight: 700;
  }

  .caption {
    text-align: left;
    font-size: ${fontSizes.caption};
  }

  .niceHr {
    border: 1px solid #eee;
  }

  .smallBr {
    margin: 10px 0;
  }

  .mediumBr {
    margin: 25 px 0;
  }

  .bold {
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: 0.2s;
    border-bottom: 3px solid rgba(239, 222, 73, 0.5);
    background-color: transparent;
  }

  a:hover {
    background-color: rgba(239, 222, 73, 0.5);
    border-bottom: 3px solid rgba(0, 0, 0, 0);
  }
`;

const dottedBg = scale({
  backgroundSize: '15px 15px',
  backgroundImage:
    'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, rgba(0, 0, 0, 0) 1px)',
});

const App = props => {
  const { children, hasDottedBg } = props;

  return (
    <div css={hasDottedBg && dottedBg}>
      <Nav />
      <div css={body}>
        {children}
        <Toaster />
        <Global styles={globalStyles} />
      </div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    toast: state.toast,
    sessionId: state.sessionId,
    user: state.user,
    portfolio: state.portfolio,
    announcement: state.announcement,
    subscription: state.subscription,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

App.defaultProps = {};

App.propTypes = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
