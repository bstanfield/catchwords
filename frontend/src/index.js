import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as R from 'ramda';
import {
  withRouter,
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import rootReducers from './reducers';

import App from './App';
import PlayerBoard from './routes/PlayerBoard';
import About from './routes/About';
import NotFound from './routes/NotFound';
import GameMasterBoard from './routes/GameMasterBoard';
import ResetGame from './routes/ResetGame';

import * as serviceWorker from './serviceWorker';
import { loadState, saveState } from './localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  rootReducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      game: store.getState().game,
      board: store.getState().board,
      guesses: store.getState().guesses,
    });
  }, 1000)
);

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    // if (location.pathname !== prevProps.location.pathname) {
    //   const pathNameArr = R.split('/', location.pathname);
    //   const prevPathNameArr = R.split('/', prevProps.location.pathname);
    //   if (prevPathNameArr[1] === 'portfolio' && R.length(prevPathNameArr) > 2) {
    //     return;
    //   }
    //   if (prevPathNameArr[1] === 'projects' && R.length(prevPathNameArr) > 2) {
    //     return;
    //   }
    //   if (
    //     (pathNameArr[1] === 'calculator' && R.length(pathNameArr) > 3) ||
    //     (prevPathNameArr[1] === 'calculator' &&
    //       R.length(prevPathNameArr) > 3 &&
    //       pathNameArr[1] !== 'payment')
    //   ) {
    //     return;
    //   }
    // }
    window.scrollTo(0, 0);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ScrollToTop.defaultProps = {
  children: null,
  location: {},
};

ScrollToTop.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Scroll = withRouter(ScrollToTop);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Scroll>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <App hasDottedBg>
                <PlayerBoard />
              </App>
            )}
          />
          <Route
            exact
            path="/reset"
            render={() => (
              <App hasDottedBg>
                <ResetGame />
              </App>
            )}
          />
          <Route
            exact
            path="/game-master-1"
            render={() => (
              <App hasDottedBg>
                <GameMasterBoard teamTurn="team1" />
              </App>
            )}
          />
          <Route
            exact
            path="/game-master-2"
            render={() => (
              <App hasDottedBg>
                <GameMasterBoard teamTurn="team2" />
              </App>
            )}
          />
          {/* Not Found */}
          <Route
            exact
            path="/404"
            render={() => (
              <App isPublic>
                <NotFound />
              </App>
            )}
          />
          <Route
            render={() => (
              <App isPublic>
                <NotFound />
              </App>
            )}
          />
        </Switch>
      </Scroll>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
