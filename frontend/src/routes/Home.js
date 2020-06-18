/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import Network from '../lib/network';

export default function Home(props) {
  const history = useHistory();

  async function startGame() {
    const [response, responseBody] = await Network.get('get-new-board');
    if (response.ok) {
      history.push(`/board/${responseBody.boardUrl}`);
    }
  }

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => startGame()}>Start new game</button>
    </div>
  );
}


