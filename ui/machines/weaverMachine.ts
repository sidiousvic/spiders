import { Machine, interpret } from "xstate";

export type WeaverEvents = "TOGGLE_MODE" | "STAGE" | "COMMIT";

export interface WeaverStateSchema {
  states: {
    weave: {};
    read: {};
    staged: {};
  };
}

export type WeaverStateEvent = { type: WeaverEvents };
export type Modes = "weave" | "read" | "staged";

export const weaverMachine = Machine<{}, WeaverStateSchema, WeaverStateEvent>({
  id: "weaverMachine",
  initial: "weave",
  states: {
    weave: { on: { TOGGLE_MODE: "read", STAGE: "staged" } },
    read: { on: { TOGGLE_MODE: "weave", STAGE: "staged" } },
    staged: { on: { COMMIT: "weave", TOGGLE_MODE: "weave" } },
  },
});

export const weaverService = interpret(weaverMachine);
