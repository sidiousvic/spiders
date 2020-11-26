import { Machine, interpret } from "xstate";

export interface ThemeStateSchema {
  states: {
    online: {};
    offline: {};
    defused: {};
  };
}

export type ThemeStateEvent = {
  type: "ONLINE" | "OFFLINE" | "DEFUSE" | "FUSE";
};

export const floodLightMachine = Machine<{}, ThemeStateSchema, ThemeStateEvent>(
  {
    id: "floodLightMachine",
    initial: "offline",
    states: {
      online: { on: { OFFLINE: "offline", DEFUSE: "defused" } },
      offline: { on: { ONLINE: "online", DEFUSE: "defused" } },
      defused: { on: { FUSE: "offline" } },
    },
  }
);

export const floodLightService = interpret(floodLightMachine).start();
