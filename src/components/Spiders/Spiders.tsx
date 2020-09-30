import React, { useState } from "react";
import Login from "./Login/Login";

export default function Spiders() {
  const [token, setToken] = useState("");

  return (
    <div id="spiders">
      <h1>Spiders 🕸</h1>
      <h2>A web engineering log.</h2>
      {!token && <Login setToken={setToken} />}
      {token && "Signed in"}
    </div>
  );
}
