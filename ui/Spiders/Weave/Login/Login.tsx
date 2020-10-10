import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { useMutation } from "@apollo/client";

import { gql } from "@apollo/client";

export const signinMutation = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => gql`
mutation {
  signin(input: {username: "${username}", password: "${password}"}) {
    token
  }
}
`;

interface LoginProps {
  setToken: Dispatch<SetStateAction<string>>;
}

export default function Login({ setToken }: LoginProps) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [signin, { data }] = useMutation(signinMutation(login));

  useEffect(() => {
    if (data) setToken(data.signin.token);
  }, [data]);

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
          <button onClick={() => signin()} type="submit">
            Login
          </button>
        </ul>
      </div>
    </>
  );
}
