import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './routes/Home';
import PlayerBoard from "./routes/PlayerBoard";
import AddWord from "./routes/AddWord";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/board/:id">
          <PlayerBoard />
        </Route>
        <Route path="/words/add">
          <AddWord />
        </Route>
      </Switch>
    </Router>
  );
}