/** @jsx jsx */

import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { scale } from '../../style/scale';
import { noStyleLink } from '../../style/text';
import {
  genericFlex,
  alignItemsBaseline,
  justifyContentCenter,
} from '../../style/flex';
import email from '../../static/images/email.png';
import twitter from '../../static/images/twitter.png';
import linkedin from '../../static/images/linkedin.png';

const outerContainer = scale({
  width: '100%',
  height: '50px',
  backgroundColor: '#f5f5f5',
});

const innerContainer = scale({
  maxWidth: '1050px',
  padding: '10px',
  paddingTop: '15px',
  paddingLeft: '20px',
  margin: 'auto',
});

const mediaLink = scale({
  width: '18px',
  opacity: 0.5,
  margin: '0px 15px 0px 0px',
  transition: '200ms opacity',
  '&:hover': {
    opacity: 0.8,
  },
});

const Footer = props => {
  const {} = props;

  return (
    <div css={outerContainer}>
      <div
        css={[
          innerContainer,
          genericFlex,
          alignItemsBaseline,
          justifyContentCenter,
        ]}
      >
        <a
          href="mailto:mimitranzambetti@gmail.com"
          target="_blank"
          css={noStyleLink}
        >
          <img src={email} css={mediaLink} />
        </a>
        <a href="https://twitter.com/mims_tz" target="_blank" css={noStyleLink}>
          <img src={twitter} css={mediaLink} />
        </a>
        <a
          href="https://www.linkedin.com/in/mimi-tran-zambetti-505b4310a/"
          target="_blank"
          css={noStyleLink}
        >
          <img src={linkedin} css={mediaLink} />
        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
