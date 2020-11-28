import { weaverService } from "./weaverMachine";
import { Machine, interpret } from "xstate";

export enum Routes {
  "/" = "/",
  "/weaver" = "/weaver",
  "/signin" = "/signin",
  "/post" = "/post",
}

export interface RouterStateSchema {
  states: {
    "/": {};
    "/weaver": {};
    "/signin": {};
    "/post": {};
  };
}

export type RouterStateEvent = { type: Routes };

export const routerMachine = Machine<{}, RouterStateSchema, RouterStateEvent>(
  {
    id: "routerMachine",
    initial: location.pathname as Routes,
    states: {
      "/": {
        on: { "/weaver": "/weaver", "/signin": "/signin", "/post": "/post" },
      },
      "/signin": { on: { "/weaver": "/weaver", "/": "/" } },
      "/weaver": {
        on: { "/": "/", "/signin": "/signin" },
        exit: "exitWeaver",
      },
      "/post": { on: { "/weaver": "/weaver", "/": "/", "/signin": "/signin" } },
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
