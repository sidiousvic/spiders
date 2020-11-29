import { floodLightService } from "./floodLightMachine";
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

export type RouterStateEvent = { type: Routes; auth: { token: string } };

export const routerMachine = Machine<{}, RouterStateSchema, RouterStateEvent>(
  {
    id: "routerMachine",
    initial: location.pathname as Routes,
    states: {
      "/": {
        onEntry: ["onlineFloodLights"],
        on: {
          "/weaver": { target: "/weaver", cond: "userIsAuthed" },
          "/signin": "/signin",
          "/post": "/post",
        },
      },
      "/signin": {
        on: {
          "/weaver": { target: "/weaver", cond: "userIsAuthed" },
          "/": "/",
        },
      },
      "/weaver": {
        onEntry: ["defuseFloodLights"],
        on: { "/": "/", "/signin": "/signin" },
        exit: "exitWeaver",
      },
      "/post": {
        on: {
          "/weaver": { target: "/weaver", cond: "userIsAuthed" },
          "/": "/",
          "/signin": "/signin",
        },
      },
    },
  },
  {
    actions: {
      exitWeaver: (_, __) => {
        weaverService.send("RESET");
      },
      defuseFloodLights() {
        floodLightService.send("DEFUSE");
      },
      fuseFloodLights() {
        floodLightService.send("FUSE");
      },
      onlineFloodLights() {
        floodLightService.send("ONLINE");
      },
    },
    guards: {
      userIsAuthed(_, { auth: { token } }) {
        return Boolean(token);
      },
    },
  }
);

export const routerService = interpret(routerMachine).start();
