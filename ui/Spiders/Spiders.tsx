import React, { useState } from "react";
import { getTimeOfDayTheme } from "../utils";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import routes from "../routes";

export default function Spiders() {
  const timeOfDayTheme = getTimeOfDayTheme();
  const [theme, setTheme] = useState(timeOfDayTheme);
  const [lightSwitch, setLightSwitch] = useState(
    theme === "dark" ? "🌒" : "🌔"
  );

  function toggleThemes() {
    setLightSwitch(lightSwitch === "🌒" ? "🌔" : "🌒");
    const themes = ["light", "dark"];
    let currThemeIdx = themes.indexOf(theme);
    const nextThemeIdx = ++currThemeIdx % themes.length;
    setTheme(themes[nextThemeIdx]);
  }

  return (
    (theme && (
      <div id="theme" className={theme}>
        <span id="light-switch" onClick={toggleThemes}>
          {lightSwitch}
        </span>
        <Navbar />
        <Switch>
          {routes.map((route) => (
            <Route key={route.name} {...route} />
          ))}
        </Switch>
      </div>
    )) || <div></div>
  );
}
