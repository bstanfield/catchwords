import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetAndSetBoard } from '../../actions/board';

const GetBoard = (props) => {
  const { children, match, location, id, game } = props;

  useEffect(() => {
    if (game.gameUrl !== match.params.gameUrl && match.params.gameUrl) {
      props.GetAndSetBoard(match.params.gameUrl);
    }
  }, [game.gameUrl, match.params.gameUrl, props]);

  return <div key={id}>{children}</div>;
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ GetAndSetBoard }, dispatch);
}

GetBoard.defaultProps = {};

GetBoard.propTypes = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GetBoard)
);
