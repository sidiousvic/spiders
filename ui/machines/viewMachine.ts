import { Machine, interpret } from "xstate";

export interface ViewStateSchema {
  states: {
    read: {};
    weave: {};
    login: {};
  };
}
export type Transitions = "WEAVE" | "LOGIN" | "READ";
export type ViewStateEvent = { type: Transitions };
export type Views = "read" | "weave" | "login";

export const viewMachine = Machine<{}, ViewStateSchema, ViewStateEvent>({
  id: "viewMachine",
  initial: "weave",
  states: {
    read: { on: { WEAVE: "login" } },
    login: { on: { LOGIN: "weave" } },
    weave: { on: { READ: "read" } },
  },
});

export const viewService = interpret(viewMachine);
