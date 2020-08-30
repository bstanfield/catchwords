/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { hitAPIEndpoint } from '../helpers/util';
import { jsx } from '@emotion/core';
import { scale } from '../style/scale';

const header = scale({
  fontFamily: 'Fira Sans, system-ui, sans-serif',
  textAlign: 'center',
  fontSize: 36
});

const NewBoard = () => {
  const [url, setUrl] = useState(false);

  const generateBoard = async () => {
    const board = await hitAPIEndpoint('get', 'get-new-board');
    return board;
  };

  useEffect(() => {
    const asyncFn = async () => {
      const response = await (await generateBoard()).json();
      setUrl(response.id);
    };
    asyncFn();
  }, []);

  return (
    <div>
      <h1 css={header}>Creating board...</h1>
      {url ? <Redirect to={`/board/${url}`} /> : null}
    </div>
  );
};

export default NewBoard;
