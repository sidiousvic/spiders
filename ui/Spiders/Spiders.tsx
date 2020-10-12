import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import routes from "../routes";

export default function Spiders() {
  const [theme, setTheme] = useState("light");
  const [lightSwitch, setLightSwitch] = useState("🌔");

  function toggleThemes() {
    setLightSwitch(lightSwitch === "🌔" ? "🌒" : "🌔");
    const themes = ["light", "dark"];
    let currThemeIdx = themes.indexOf(theme);
    const nextThemeIdx = ++currThemeIdx % themes.length;
    console.log(themes[nextThemeIdx]);
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
