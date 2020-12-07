import { Role } from "@spiders";
/** @TODO refactor this wasteland */
import { Machine, interpret, sendParent, assign } from "xstate";
import { fireGraphQLQuery, Warning } from "../utils";

function invoke(src) {
  const { id } = src;
  return {
    [id]: {
      invoke: {
        id,
        src,
        autoForward: true,
      },
    },
  };
}

const routerBlueprint = Machine({
  id: "routerMachine",
  initial: location.pathname,
  on: {
    UNAUTHED: "/signin",
    "/weaver": "/weaver",
    "/signin": "/signin",
    "/post": "/post",
    "/": "/",
  },
  states: {
    "/": {},
    "/signin": {},
    "/weaver": {
      entry: [sendParent("DEFUSE"), sendParent("GUARD")],
      exit: [sendParent("FUSE")],
    },
    "/post": {},
  },
});

const lightBlueprint = Machine({
  id: "lightMachine",
  initial: "offline",
  states: {
    online: {
      entry: [],
      on: {
        OFF: { target: "offline" },
        DEFUSE: { target: "defused" },
      },
    },
    offline: {
      entry: [],
      on: {
        ON: { target: "online" },
        DEFUSE: { target: "defused" },
      },
    },
    defused: {
      entry: [],
      on: {
        FUSE: { target: "offline" },
      },
    },
  },
});

const themeBlueprint = Machine({
  id: "themeMachine",
  initial: "dark",
  states: {
    dark: {
      entry: [sendParent("FUSE")],
      on: {
        SWITCH_THEME: { target: "light" },
      },
    },
    light: {
      entry: [sendParent("DEFUSE")],
      on: {
        SWITCH_THEME: { target: "dark" },
      },
    },
  },
});

const weaverBlueprint = Machine(
  {
    id: "weaverMachine",
    initial: "weave",
    context: {
      post: {},
    },
    on: {
      WEAVE: "weave",
      "weaver/UPDATE": { target: "weave" },
      EMPTY_TITLE_ERROR: "emptyTitleError",
      EMPTY_BODY_ERROR: "emptyBodyError",
      EMPTY_TAGS_ERROR: "emptyTagsError",
    },
    states: {
      weave: {
        on: {
          TOGGLE_MODE: "read",
          "weaver/STAGE": "staged",
        },
      },
      read: {
        on: {
          TOGGLE_MODE: "weave",
          "weaver/STAGE": "staged",
        },
      },
      staged: {
        on: {
          "weaver/POST": "posting",
          TOGGLE_MODE: "weave",
        },
      },
      posting: {
        invoke: {
          src: "post",
          onDone: { target: "posted", actions: "onSuccess" },
          onError: { target: "postError", actions: "onError" },
        },
      },
      posted: {
        invoke: {
          src: "clearPost",
          onDone: { target: "weave", actions: "onSuccess" },
          onError: { target: "weave", actions: "onError" },
        },
        entry: [sendParent("/", { delay: 1000 })],
        on: { WEAVE: "weave" },
      },
      postError: {
        entry: [sendParent("WEAVE", { delay: 1000 })],
      },
      emptyTitleError: {
        entry: [sendParent("WEAVE", { delay: 1000 })],
      },
      emptyBodyError: {
        entry: [sendParent("WEAVE", { delay: 1000 })],
      },
      emptyTagsError: {
        entry: [sendParent("WEAVE", { delay: 1000 })],
      },
    },
  },

  {
    services: {
      async post(X, { auth, weaverPostInput }) {
        const addPostQuery = `
        mutation addPost($input: AddPostInput!) {
          addPost(
            input: $input
          ) {
            message
            resource
          }
        }
      `;

        const addPostQueryVariables = {
          input: {
            userId: auth.user.userId,
            title: weaverPostInput.title,
            author: auth.user.username,
            body: weaverPostInput.body,
            raw: weaverPostInput.raw,
            tags: weaverPostInput.tags,
          },
        };

        const updatePostQuery = `
        mutation updatePost($input: UpdatePostInput!) {
          updatePost(
            input: $input
          ) {
            message
            resource
          }
        }
      `;

        const updatePostQueryVariables = {
          input: {
            postId: weaverPostInput.postId,
            title: weaverPostInput.title,
            author: auth.user.username,
            body: weaverPostInput.body,
            raw: weaverPostInput.raw,
            tags: weaverPostInput.tags,
          },
        };

        const upsertQuery = weaverPostInput.postId
          ? updatePostQuery
          : addPostQuery;

        const variables = weaverPostInput.postId
          ? updatePostQueryVariables
          : addPostQueryVariables;

        const headers = {
          authorization: auth.token,
        };

        const {
          data: { addPost },
          errors: [error],
        } = await fireGraphQLQuery(upsertQuery, variables, headers);

        if (error) throw new Error(error.message);

        return { ...addPost };
      },
      async clearPost() {
        return {
          user: { username: undefined, role: Role.GUEST },
          token: undefined,
          message: undefined,
        };
      },
    },
    actions: {
      onSuccess: assign((X, { data }: any) => {
        return { ...data };
      }),
      /** @ts-ignore @TODO */
      onError: assign((X, { data }: any) => {
        const message = data;
        console.error(message);
        return { message };
      }),
    },
  }
);

const authBlueprint = Machine(
  {
    id: "authMachine",
    initial: "unauthed",
    context: {
      user: {
        username: "",
        role: Role.GUEST,
      },
      token: "",
      message: "",
    },
    on: {
      GUARD: { actions: ["onGuard"] },
    },
    states: {
      unauthed: {
        invoke: {
          src: "tryLocalStorage",
          onDone: { target: "authed", actions: "onSuccess" },
          onError: { actions: "onWarning" },
        },
        on: { SIGNIN: { target: "authing" } },
      },
      authing: {
        invoke: {
          src: "signIn",
          onDone: { target: "authed", actions: "onSuccess" },
          onError: { target: "unauthed", actions: "onError" },
        },
      },
      authed: {
        entry: [sendParent("/weaver")],
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
      onGuard: sendParent(({ token }) => {
        return token ? { type: "AUTHED" } : { type: "UNAUTHED" };
      }),
    },
  }
);

const postCardBlueprint = Machine(
  {
    id: "postCardMachine",
    initial: "boot",
    context: {
      message: "",
    },
    states: {
      boot: {
        on: { "STAGE/DELETE": { target: "stagedDelete" } },
      },
      stagedDelete: {
        on: {
          "CONFIRM/DELETE": { target: "deletingPost" },
          "CANCEL/DELETE": { target: "boot" },
        },
      },
      deletingPost: {
        invoke: {
          src: "deletePost",
          onDone: { target: "boot", actions: [sendParent("/")] },
          onError: { target: "boot", actions: "onError" },
        },
      },
    },
  },
  {
    services: {
      async stagePostDeletion(X, { postToBeDeleted }) {
        return postToBeDeleted;
      },
      async deletePost(X, { postToBeDeleted: { postId }, auth }) {
        const deletePostMutation = `
        mutation deletePost($input: DeletePostInput!) {
          deletePost(input: $input) {
            message
            resource
          }
        }
        `;

        const variables = { input: { postId } };

        const headers = {
          authorization: auth.token,
        };

        const {
          data: { deletePost },
          errors: [error],
        } = await fireGraphQLQuery(deletePostMutation, variables, headers);

        if (error) throw new Error("Could not delete post.");

        return { ...deletePost };
      },
    },
    actions: {
      onSuccess: assign((X, { data }: any) => {
        return { ...data };
      }),
      /** @ts-ignore @TODO */
      onError: assign((X, { data }: any) => {
        const message = data;
        console.error(message);
        return { message };
      }),
    },
  }
);

const spidersBlueprint = Machine({
  id: "spidersMachine",
  type: "parallel",
  states: {
    ...invoke(routerBlueprint),
    ...invoke(authBlueprint),
    ...invoke(lightBlueprint),
    ...invoke(themeBlueprint),
    ...invoke(weaverBlueprint),
    ...invoke(postCardBlueprint),
  },
});

export const spidersMachine = interpret(spidersBlueprint);
