import { Post } from "@spiders";
import { Machine, interpret, assign } from "xstate";
import { WeaverStateEvent } from "./weaverMachine";

const assignStagedDeletePost = assign({
  stagedDeletePost: (ctx, e) => (e as WeaverStateEvent).post,
});

export type PostCardEvents = "STAGE_DELETE" | "RESET";

export interface PostCardStateSchema {
  states: {
    read: {};
    stagedDelete: {};
  };
}

export type PostCardStateEvent = { type: PostCardEvents };

export const postCardMachine = Machine<
  { stagedDeletePost: Partial<Post> },
  PostCardStateSchema,
  PostCardStateEvent
>(
  {
    id: "postCardMachine",
    initial: "read",
    context: {
      stagedDeletePost: {},
    },
    states: {
      read: {
        on: {
          STAGE_DELETE: {
            target: "stagedDelete",
            actions: [assignStagedDeletePost],
          },
        },
      },
      stagedDelete: { on: { RESET: "read" } },
    },
  },
  {
    actions: { assignStagedDeletePost },
  }
);

export const postCardService = interpret(postCardMachine).start();
