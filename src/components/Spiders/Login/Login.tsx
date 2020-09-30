import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { signinQuery } from "../../../queries";
import { logGraphQLErrors } from "../../../utils";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string>>;
}

export default function Login({ setToken }: LoginProps) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  async function handleLogin() {
    const { username, password } = login;
    const response = await axios.post("/graphql", {
      query: signinQuery(username, password),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data: graphqlData } = response;
    if (graphqlData.errors) return logGraphQLErrors(graphqlData.errors);
    const {
      data: {
        signin: { token },
      },
    } = graphqlData;
    setToken(token);
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
