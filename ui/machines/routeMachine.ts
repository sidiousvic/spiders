import { weaverService } from "./weaverMachine";
import { Machine, interpret } from "xstate";

export enum Routes {
  "/" = "/",
  "/weaver" = "/weaver",
  "/signin" = "/signin",
}

export interface RouterStateSchema {
  states: {
    "/": {};
    "/weaver": {};
    "/signin": {};
  };
}

export type RouterStateEvent = { type: Routes };

export const routerMachine = Machine<{}, RouterStateSchema, RouterStateEvent>(
  {
    id: "routerMachine",
    initial: location.pathname as Routes,
    states: {
      "/": { on: { "/weaver": "/weaver", "/signin": "/signin" } },
      "/signin": { on: { "/weaver": "/weaver", "/": "/" } },
      "/weaver": {
        on: { "/": "/", "/signin": "/signin" },
        exit: "exitWeaver",
      },
    },
  },
  {
    actions: {
      exitWeaver: (_, __) => {
        weaverService.send("RESET");
      },
    },
  }
);

export const routerService = interpret(routerMachine).start();
