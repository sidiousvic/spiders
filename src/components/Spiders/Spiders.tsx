import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login/Login";

export default function Spiders() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/spiders/weave">
          <Weave />
        </Route>
      </Switch>
    </Router>
  );
}

function Navbar() {
  return (
    <div id="navbar">
      <Route path="/spiders">
        <div id="spiders">
          <h1>Spiders 🕸</h1>
          <h2>A web engineering log.</h2>
          <li>
            <Link to="/spiders">HOME</Link>
          </li>
          <li>
            <Link to="/spiders/weave">WEAVE</Link>
          </li>
        </div>
      </Route>
    </div>
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
