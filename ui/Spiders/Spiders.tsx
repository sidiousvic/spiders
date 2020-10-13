import React, { useState } from "react";
import { isomorphicLayoutEffect, getTimeOfDayTheme } from "../utils";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import routes from "../routes";
import Cookie from "cookie-universal";
const cookies = Cookie();

export default function Spiders() {
  const cookieTheme = cookies.get("theme");
  const timeOfDayTheme = getTimeOfDayTheme();
  const [theme, setTheme] = useState(cookieTheme || timeOfDayTheme);
  const [lightSwitch, setLightSwitch] = useState(
    theme === "dark" ? "🌒" : "🌔"
  );

  isomorphicLayoutEffect(() => {
    cookies.set("theme", theme, {
      path: "/spiders",
    });
  }, [theme]);

  function toggleThemes() {
    setLightSwitch(lightSwitch === "🌒" ? "🌔" : "🌒");
    const themes = ["light", "dark"];
    let currThemeIdx = themes.indexOf(theme);
    const nextThemeIdx = ++currThemeIdx % themes.length;
    setTheme(themes[nextThemeIdx]);
  }

  return (
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
  );
}
