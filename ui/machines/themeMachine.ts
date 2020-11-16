import { Machine, interpret } from "xstate";

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

export type ThemeStateEvent = { type: "SWITCH_THEME" };
export type Themes = "light" | "dark";

export const themeMachine = Machine<{}, ThemeStateSchema, ThemeStateEvent>({
  id: "themeMachine",
  initial: getTimeOfDayTheme(),
  states: {
    light: { on: { SWITCH_THEME: "dark" } },
    dark: { on: { SWITCH_THEME: "light" } },
  },
});

export const themeService = interpret(themeMachine);
