import { Machine, interpret } from "xstate";

export interface WeaverStateSchema {
  states: {
    weave: {};
    read: {};
  };
}

export type WeaverToggleEvent = { type: "TOGGLE" };
export type Modes = "weave" | "read";

export const weaverMachine = Machine<{}, WeaverStateSchema, WeaverToggleEvent>({
  id: "weaverMachine",
  initial: "weave",
  states: {
    weave: { on: { TOGGLE: "read" } },
    read: { on: { TOGGLE: "weave" } },
  },
});

export const weaverService = interpret(weaverMachine);
