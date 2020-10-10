import React, { useState } from "react";
import Login from "./Login/Login";

export default function Weave() {
  const [token, setToken] = useState("");
  return (
    <div id="weave">
      {!token && <Login setToken={setToken} />}
      {token && "Signed in"}
    </div>
  );
}
