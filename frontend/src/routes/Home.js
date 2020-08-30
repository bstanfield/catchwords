/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { hitAPIEndpoint, colors } from '../helpers/util';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';

const centeredContainer = scale({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 280,
  top: 0,
  margin: 'auto',
  width: 600,
  maxWidth: '90%',
  height: 'fit-content'
});

const header = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  textAlign: 'center',
  fontSize: 60,
  fontWeight: 'bold'
});

const button = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  maxWidth: 200,
  backgroundColor: colors.greenButton,
  padding: 18,
  textAlign: 'center',
  color: 'white',
  textDecoration: 'none',
  borderRadius: 4,
  display: 'block',
  margin: 'auto'
});

const activeGames = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  fontSize: 22
});

function isEmpty(obj) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const Home = () => {
  const [boards, setBoards] = useState({});

  const getBoards = async () => {
    const boards = await hitAPIEndpoint('get', 'get-boards');
    return boards;
  };

  useEffect(() => {
    const asyncFn = async () => {
      const response = await (await getBoards()).json();
      setBoards(response);
    };
    asyncFn();
  }, []);

  return (
    <div css={centeredContainer}>
      <h1 css={header}>Catchwords</h1>
      <a css={button} href="/new">
        Start new game
      </a>
      <br />
      <br />
      <br />
      <div css={activeGames}>
        <p>Active games:</p>
        <ul>
          {!isEmpty(boards) &&
            Object.keys(boards).map(board => <li>{board}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Home;
