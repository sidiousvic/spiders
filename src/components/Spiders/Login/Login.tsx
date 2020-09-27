import React, { useState, useRef } from "react";

export default function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function handleLogin() {
    // auth request from here
  }

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function handleLoginInput() {
    const usernameInput = usernameInputRef.current;
    const passwordInput = passwordInputRef.current;
    if (usernameInput && passwordInput) {
      setLogin({
        username: usernameInput.value,
        password: passwordInput.value,
      });
    }
  }

  return (
    <div id="login-form">
      <ul>
        <label htmlFor="username">username</label>
        <br />
        <input
          ref={usernameInputRef}
          onChange={handleLoginInput}
          type="text"
          placeholder="user"
          name="username"
          required
        />
        <br />
        <label htmlFor="uname">Password</label>
        <br />
        <input
          ref={passwordInputRef}
          onChange={handleLoginInput}
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <br />
        <button onClick={handleLogin} type="submit">
          Login
        </button>
      </ul>
    </div>
  );
}
