import { Machine, interpret } from "xstate";

export interface ThemeStateSchema {
  states: {
    online: {};
    off: {};
    defused: {};
  };
}

export type ThemeStateEvent = { type: "ONLINE" | "OFF" | "DEFUSE" | "FUSE" };

export const floodLightMachine = Machine<{}, ThemeStateSchema, ThemeStateEvent>(
  {
    id: "floodLightMachine",
    initial: "online",
    states: {
      online: { on: { OFF: "off", DEFUSE: "defused" } },
      off: { on: { ONLINE: "online", DEFUSE: "defused" } },
      defused: { on: { FUSE: "off" } },
    },
  }
);

export const floodLightService = interpret(floodLightMachine).start();
