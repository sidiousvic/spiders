import { weaverService } from "./weaverMachine";
import { Machine, interpret } from "xstate";

export enum Routes {
  "/" = "/",
  "/weaver" = "/weaver",
  "/signin" = "/signin",
}

const routerMachineUtils = {
  protectRoutes(route: string, protectedRoutes: string[]) {
    if (protectedRoutes.includes(route) || !(route in Routes)) {
      history.pushState(null, null, "/");
      return "/";
    }
    return route as Routes;
  },
};
const { protectRoutes } = routerMachineUtils;

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
    initial: protectRoutes(location.pathname, ["/weaver"]),
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

export const routerService = interpret(routerMachine);
