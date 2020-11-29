import { Machine, interpret } from "xstate";

export interface FloodLightStateSchema {
  states: {
    online: {};
    offline: {};
    defused: {};
  };
}

export type FloodLightStateEvent = {
  type: "ONLINE" | "OFFLINE" | "DEFUSE" | "FUSE";
};

export const floodLightMachine = Machine<
  {},
  FloodLightStateSchema,
  FloodLightStateEvent
>({
  id: "floodLightMachine",
  initial: "defused",
  states: {
    online: { on: { OFFLINE: "offline", DEFUSE: "defused" } },
    offline: { on: { ONLINE: "online", DEFUSE: "defused" } },
    defused: { on: { FUSE: "offline" } },
  },
});

export const floodLightService = interpret(floodLightMachine).start();
