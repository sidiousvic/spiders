import React, { useLayoutEffect, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import routes from "../routes";
import Cookie from "cookie-universal";
const cookies = Cookie();

export default function Spiders() {
  const cookieTheme = cookies.get("theme");
  const [theme, setTheme] = useState(cookieTheme);
  const [lightSwitch, setLightSwitch] = useState(
    theme === "dark" ? "🌒" : "🌔"
  );

  if (typeof document !== "undefined") {
    useLayoutEffect(() => {
      cookies.set("theme", theme, {
        path: "/spiders",
      });
    }, [theme]);
  } else {
    useEffect(() => {
      cookies.set("theme", theme, {
        path: "/spiders",
      });
    }, [theme]);
  }

  function toggleThemes() {
    setLightSwitch(lightSwitch === "🌒" ? "🌔" : "🌒");
    const themes = ["light", "dark"];
    let currThemeIdx = themes.indexOf(theme);
    const nextThemeIdx = ++currThemeIdx % themes.length;
    setTheme(themes[nextThemeIdx]);
  }

  return (
    theme && (
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
    )
  );
}
