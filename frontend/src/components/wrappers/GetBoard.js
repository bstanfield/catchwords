import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { GetAndSetBoard } from '../../actions/board';

const GetBoard = props => {
  const { children, match, location, id, game } = props;

  console.log('location', location);
  console.log('match', match);

  useEffect(() => {
    if (game.gameUrl !== match.params.boardId && match.params.boardId) {
      props.GetAndSetBoard(match.params.boardId);
    }
  }, [match.params.boardId]);

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
