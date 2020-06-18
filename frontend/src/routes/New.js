import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { hitAPIEndpoint } from '../helpers/util'

const NewBoard = () => {
  const [url, setUrl] = useState(false);

  const generateBoard = async () => {
    const board = await hitAPIEndpoint('get', 'get-new-board');
    return board;
  }

  useEffect(() => {
    const asyncFn = async () => {
      const response = await (await generateBoard()).json();
      setUrl(response.boardUrl);
    }
    asyncFn();
  }, []);

  return (
    <div>
      <h1>Creating board...</h1>
      { url ? <Redirect to={`/board/${url}`} /> : null}
    </div>
  );
};

export default NewBoard;
