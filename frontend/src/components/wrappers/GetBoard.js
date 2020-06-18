import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const GetBoard = props => {
  const { children, match, location, id, game } = props;

  console.log('location', location);
  console.log('match', match);

  useEffect(() => {
    if (game.gameUrl !== match.params.gameUrl && match.params.gameUrl) {
      // removing redux
      // props.GetAndSetBoard(match.params.gameUrl);
    }
  }, [game.gameUrl, match.params.gameUrl]);

  return <div key={id}>{children}</div>;
};

GetBoard.defaultProps = {};

GetBoard.propTypes = {};

export default withRouter(GetBoard)
