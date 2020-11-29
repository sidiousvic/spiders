import { Machine, interpret } from "xstate";
import { floodLightService } from "./floodLightMachine";

const themeMachineUtils = {
  getTimeOfDayTheme(): Themes {
    const hour = new Date().getHours();
    const isAfter18 = hour >= 17;
    const isBefore7 = hour < 7;
    if (isAfter18 || isBefore7) return "dark";
    return "light";
  },
};
const { getTimeOfDayTheme } = themeMachineUtils;

export interface ThemeStateSchema {
  states: {
    light: {};
    dark: {};
  };
}

export type ThemeStateEvent = { type: "SWITCH_THEME" | "INIT" };
export type Themes = "light" | "dark";

export const themeMachine = Machine<{}, ThemeStateSchema, ThemeStateEvent>(
  {
    id: "themeMachine",
    initial: (localStorage.getItem("theme") as Themes) || getTimeOfDayTheme(),
    states: {
      light: {
        onEntry: ["defuseFloodLights"],
        on: {
          SWITCH_THEME: { target: "dark", actions: ["fuseFloodLights"] },
        },
      },
      dark: {
        onEntry: ["fuseFloodLights"],
        on: {
          SWITCH_THEME: { target: "light" },
        },
      },
    },
  },
  {
    actions: {
      defuseFloodLights() {
        floodLightService.send("DEFUSE");
      },
      fuseFloodLights() {
        floodLightService.send("FUSE");
      },
    },
  }
);

export const themeService = interpret(themeMachine).start();
