import { Role } from "@spiders";
import { Machine, interpret, assign } from "xstate";
import { fireGraphQLQuery, Warning } from "../utils";

const authBlueprint = Machine(
  {
    initial: "unauthed",
    context: {
      user: {
        username: "",
        role: Role.GUEST,
      },
      token: "",
      message: "",
    },
    states: {
      unauthed: {
        invoke: {
          src: "tryLocalStorage",
          onDone: {
            target: "authed",
            actions: ["onSuccess"],
          },
          onError: { actions: ["onWarning"] },
        },
      },
      authing: {
        invoke: [
          {
            src: "signIn",
            onDone: {
              target: "authed",
              actions: ["onSuccess"],
            },
            onError: {
              target: "unauthed",
              actions: ["onError"],
            },
          },
        ],
      },
      authed: {
        on: {
          SIGNOUT: { target: "unauthing" },
        },
      },
      unauthing: {
        invoke: {
          src: "signOut",
          onDone: { target: "unauthed", actions: "onSuccess" },
          onError: { target: "unauthed", actions: "onError" },
        },
      },
    },
  },
  {
    services: {
      async signIn(X, { signInInput: { username, password } }) {
        const signInQuery = `
            mutation signIn($input: UserSignIn!) {
             signIn(input: $input) {
               token
               user {
                 username
                 userId
                 role
               }
             }
           }
         `;

        const variables = {
          input: {
            username,
            password,
          },
        };

        const {
          data: { signIn },
          errors: [error],
        } = await fireGraphQLQuery(signInQuery, variables);

        if (error) throw new Error(error.message);

        localStorage.setItem("auth", JSON.stringify(signIn));

        return { ...signIn };
      },
      async signOut() {
        localStorage.removeItem("auth");
        return {
          user: { username: undefined, role: Role.GUEST },
          token: undefined,
          message: undefined,
        };
      },
      async tryLocalStorage() {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth) throw new Warning("No auth found on local storage.");
        return auth;
      },
    },
    actions: {
      onSuccess: assign((X, { data }: any) => {
        return { ...data };
      }),
      onError: assign((X, { data }: any) => {
        const message = data;
        console.error(message);
        return { message };
      }),
      onWarning: assign((X, { data }: any) => {
        const message = data;
        console.warn(message);
        return { message };
      }),
    },
  }
);

const authMachine = interpret(authBlueprint).start();

export { authMachine };
