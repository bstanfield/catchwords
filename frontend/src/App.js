import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import New from './routes/New';
import PlayerBoard from "./routes/PlayerBoard";
import AddWord from "./routes/AddWord";
import Socket from "./routes/Socket";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/board/:id">
            <PlayerBoard />
          </Route>
          <Route path="/words/add">
            <AddWord />
          </Route>
          <Route path="/socket/:id">
            <Socket />
          </Route>
        </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <a href="/new">Start new game</a>
    </div>
  );
}

