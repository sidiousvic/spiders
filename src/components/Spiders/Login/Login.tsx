import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { signinQuery } from "../../../queries";
import { logGraphQLErrors } from "../../../utils";
//@ts-ignore
import magicword_gif from "../../../assets/magicword.gif";

interface LoginProps {
  setToken: Dispatch<SetStateAction<string>>;
}

export default function Login({ setToken }: LoginProps) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [wrongLogin, setWrongLogin] = useState(false);

  async function handleLogin() {
    const { username, password } = login;
    const response = await axios.post("/spiders/graphql", {
      query: signinQuery(username, password),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data: graphqlData } = response;
    if (graphqlData.errors) {
      setWrongLogin(true);
      return logGraphQLErrors(graphqlData.errors);
    }
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
    setWrongLogin(false);
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
    <>
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
      {wrongLogin && <Magicword />}
    </>
  );
}

function Magicword() {
  console.log(magicword_gif);
  return <img src={magicword_gif} />;
}
