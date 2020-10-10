import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import routes from "../routes";

export default function Spiders() {
  return (
    <>
      <Navbar />
      <Switch>
        {routes.map((route) => (
          <Route key={route.name} {...route} />
        ))}
      </Switch>
    </>
  );
}
