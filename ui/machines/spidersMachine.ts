import { Role } from "@spiders";
/** @TODO refactor this wasteland */
import { Machine, interpret, assign, send } from "xstate";
import { fireGraphQLQuery, Warning } from "../utils";

const spidersBlueprint = Machine(
  {
    id: "spiders",
    type: "parallel",
    context: {
      post: {},
      user: {
        username: "",
        role: Role.GUEST,
      },
      token: "",
      message: "",
    },
    on: {
      WEAVE: ".weaver.weave",
      UPDATE_WEAVER_POST: { target: ".weaver.weave" },
      EMPTY_TITLE_ERROR: ".weaver.emptyTitleError",
      EMPTY_BODY_ERROR: ".weaver.emptyBodyError",
      EMPTY_TAGS_ERROR: ".weaver.emptyTagsError",
      SIGNIN: { target: ".auth.authing" },
    },
    states: {
      router: {
        initial: location.pathname,
        on: {
          "/": { target: "router./" },
          "/weaver": {
            target: "router./weaver",
            actions: [() => console.log("weaver action")],
          },
          "/admin": { target: "router./admin" },
          "/post": { target: "router./post" },
        },
        states: {
          "/": {},
          "/admin": {},
          "/weaver": { entry: "guarded" },
          "/post": {},
        },
      },
      auth: {
        initial: "unauthed",
        states: {
          unauthed: {
            invoke: {
              src: "tryLocalStorage",
              onDone: {
                target: "authed",
                actions: ["onSuccess", send("/")],
              },
              onError: { actions: ["onWarning", send("/admin")] },
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
            entry: [send("/")],
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
      theme: {
        initial: "dark",
        states: {
          dark: {
            on: {
              SWITCH_THEME: { target: "light" },
            },
          },
          light: {
            entry: ["LIGHTS_OFF"],
            on: {
              SWITCH_THEME: { target: "dark" },
            },
          },
        },
      },
      weaver: {
        initial: "weave",
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
            entry: ["/"],
            on: { WEAVE: "weave" },
          },
          postError: {
            entry: ["WEAVE"],
          },
          emptyTitleError: {
            entry: ["WEAVE"],
          },
          emptyBodyError: {
            entry: ["WEAVE"],
          },
          emptyTagsError: {
            entry: ["WEAVE"],
          },
        },
      },
      postCard: {
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
              onDone: { target: "boot", actions: "onSuccess" },
              onError: { target: "boot", actions: "onError" },
            },
          },
        },
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
        return { post: {} };
      },
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
      guarded: send((ctx) => {
        if (ctx.user.role === "DARKLORD") return { type: "ACCESS_GRANTED" };
        return { type: "/admin" };
      }),
      onSuccess: assign((X, { data }: any) => {
        return { ...data };
      }),
      /** @ts-ignore @TODO */
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

const spidersMachine = interpret(spidersBlueprint);

export { spidersMachine };
