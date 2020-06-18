import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Network from '../lib/network';

const NewBoard = () => {
  const [url, setUrl] = useState(false);

  const generateBoard = async () => {
    const [response, responseBody] = await Network.get('get-new-board');
    if (response.ok) {
      return responseBody;
    }
  }

  useEffect(() => {
    const asyncFn = async () => {
      const response = await (await generateBoard()).json();
      setUrl(response.boardUrl);
    };
    asyncFn();
  }, []);

  return (
    <div>
      <h1>Creating board...</h1>
      {url ? <Redirect to={`/board/${url}`} /> : null}
    </div>
  );
};

export default NewBoard;
