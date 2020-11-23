import { Post } from "spiders";
import { Machine, interpret, assign } from "xstate";

const assignPost = assign({
  post: (ctx, e) => (e as WeaverStateEvent).post,
});

export type WeaverEvents =
  | "TOGGLE_MODE"
  | "UPDATE"
  | "STAGE"
  | "POSTED"
  | "POST_ERROR"
  | "EMPTY_TITLE_ERROR"
  | "EMPTY_BODY_ERROR"
  | "EMPTY_TAGS_ERROR"
  | "RESET";

export interface WeaverStateSchema {
  states: {
    weave: {};
    read: {};
    staged: {};
    posted: {};
    postError: {};
    emptyTitleError: {};
    emptyBodyError: {};
    emptyTagsError: {};
  };
}

export type WeaverStateEvent = { type: WeaverEvents; post: Partial<Post> };

export const weaverMachine = Machine<
  { post: Partial<Post> },
  WeaverStateSchema,
  WeaverStateEvent
>(
  {
    id: "weaverMachine",
    context: {
      post: {},
    },
    initial: "weave",
    states: {
      weave: {
        on: {
          TOGGLE_MODE: "read",
          STAGE: "staged",
          RESET: { target: "weave", actions: [assignPost] },
          UPDATE: { target: "weave", actions: [assignPost] },
        },
      },
      read: {
        on: {
          TOGGLE_MODE: "weave",
          STAGE: "staged",
          RESET: { target: "weave", actions: [assignPost] },
          UPDATE: { target: "weave", actions: [assignPost] },
        },
      },
      staged: {
        on: {
          POSTED: "posted",
          TOGGLE_MODE: "weave",
          RESET: { target: "weave", actions: [assignPost] },
          EMPTY_TITLE_ERROR: "emptyTitleError",
          EMPTY_BODY_ERROR: "emptyBodyError",
          EMPTY_TAGS_ERROR: "emptyTagsError",
        },
      },
      posted: { on: { RESET: "weave" } },
      postError: { on: { RESET: "weave" } },
      emptyTitleError: { on: { RESET: "weave" } },
      emptyBodyError: { on: { RESET: "weave" } },
      emptyTagsError: { on: { RESET: "weave" } },
    },
  },
  {
    actions: { assignPost },
  }
);

export const weaverService = interpret(weaverMachine).start();
