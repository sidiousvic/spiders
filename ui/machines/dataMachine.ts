import { Machine, interpret, assign } from "xstate";
import { logGraphQLErrors } from "../utils";

const dataBlueprint = Machine(
  {
    initial: "idle",
    context: {
      posts: [],
      message: "",
    },
    on: {
      FETCH_POSTS: "fetchingPosts",
    },
    states: {
      idle: {},
      fetchingPosts: {
        invoke: [
          {
            src: "fetchPosts",
            onDone: {
              target: "postsFetched",
              actions: ["onSuccess"],
            },
            onError: {
              target: "fetchError",
              actions: ["onError"],
            },
          },
        ],
      },
      postsFetched: { entry: [(ctx) => console.log(ctx)] },
      fetchError: {},
    },
  },
  {
    services: {
      async fetchPosts() {
        const res = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `{ 
                  findPosts { 
                    postId
                    title 
                    author 
                    body 
                    raw
                    createdAt 
                    tags
                  }
                }`,
          }),
        });

        const {
          data: { findPosts },
        } = await res.json();

        return { posts: [...findPosts] };
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

const dataMachine = interpret(dataBlueprint).start();

export { dataMachine };
