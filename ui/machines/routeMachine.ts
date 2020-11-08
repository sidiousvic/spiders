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

export interface RouterStateSchema {
  states: {
    "/": {};
    "/weaver": {};
    "/signin": {};
  };
}

export type RouterStateEvent = { type: Routes };

const { protectRoutes } = routerMachineUtils;

export const routerMachine = Machine<{}, RouterStateSchema, RouterStateEvent>({
  id: "routerMachine",
  initial: protectRoutes(location.pathname, ["/weaver"]),
  states: {
    "/": { on: { "/weaver": "/weaver" } },
    "/signin": { on: { "/weaver": "/weaver", "/": "/" } },
    "/weaver": { on: { "/": "/", "/signin": "/signin" } },
  },
});

export const routerService = interpret(routerMachine);
