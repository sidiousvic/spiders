import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
      <div id="spiders">
        <h1>Spiders 🕸</h1>
        <h2>A web engineering log.</h2>
        <li>
          <Link to="/spiders">home</Link>
        </li>
        <li>
          <Link to="/spiders/weave">weave</Link>
        </li>
      </div>
    </div>
  );
}
