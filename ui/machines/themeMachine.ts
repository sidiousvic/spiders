import { Machine, interpret } from "xstate";

const themeMachineUtils = {
  getTimeOfDayTheme(): Themes {
    let timeOfDayTheme: Themes;
    const isAfter6 = new Date().getHours() > 18;
    if (isAfter6) timeOfDayTheme = "dark";
    else timeOfDayTheme = "light";
    return timeOfDayTheme;
  },
};

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
  initial: themeMachineUtils.getTimeOfDayTheme(),
  states: {
    light: { on: { SWITCH_THEME: "dark" } },
    dark: { on: { SWITCH_THEME: "light" } },
  },
});

export const themeService = interpret(themeMachine);
