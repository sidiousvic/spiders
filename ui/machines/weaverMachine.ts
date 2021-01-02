import { Role } from "@spiders";
import { Machine, interpret } from "xstate";
import { Warning, fireGraphQLQuery } from "../utils";

const weaverBlueprint = Machine(
  {
    initial: "weave",
    context: {
      post: {},
      message: "",
    },
    on: {
      WEAVE: "weave",
      UPDATE_WEAVER_POST: { target: "weave" },
      EMPTY_TITLE_ERROR: "emptyTitleError",
      EMPTY_BODY_ERROR: "emptyBodyError",
      EMPTY_TAGS_ERROR: "emptyTagsError",
    },
    states: {
      weave: {
        on: {
          TOGGLE_MODE: "read",
          STAGE: "staged",
        },
      },
      read: {
        on: {
          TOGGLE_MODE: "weave",
          STAGE: "staged",
        },
      },
      staged: {
        on: {
          POST: "posting",
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
        after: { 1000: "weave" },
      },
      emptyTitleError: {
        after: { 1000: "weave" },
      },
      emptyBodyError: {
        after: { 1000: "weave" },
      },
      emptyTagsError: {
        after: { 1000: "weave" },
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
  }
);

const weaverMachine = interpret(weaverBlueprint).start();

export { weaverMachine };
