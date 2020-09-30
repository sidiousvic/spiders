import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login/Login";

export default function Spiders() {
  return (
    <Router>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="/weave">weave</Link>
      </li>
      <Switch>
        <Route path="/weave">
          <Weave />
        </Route>
        <Route path="/">
          <div id="spiders">
            <h1>Spiders 🕸</h1>
            <h2>A web engineering log.</h2>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

function Weave() {
  const [token, setToken] = useState("");
  return (
    <div id="weave">
      {!token && <Login setToken={setToken} />}
      {token && "Signed in"}
    </div>
  );
}
