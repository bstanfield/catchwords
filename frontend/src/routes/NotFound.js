/** @jsx jsx */

import { jsx } from '@emotion/core';
import { scale } from '../style/scale';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { maxWidth, marginAuto } from '../style/misc';

const centerBoxStyle = scale({
  minWidth: '600px',
  margin: 'auto',
  textAlign: 'center',
  padding: '50px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const NotFound = () => (
  <div css={centerBoxStyle}>
    <br />
    <br />
    <h1>Oops >:(</h1>
    <div className="smallBr" />
    <h3>Looks like that page doesn't exist yet.</h3>
    <br />
    <div css={[maxWidth(300), marginAuto]}>
      <Link to="/">
        <Button text="&larr; Go Back" size="large" />
      </Link>
    </div>
  </div>
);

export default NotFound;
