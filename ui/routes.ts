import Weave from "./Spiders/Weave/Weave";
import Log from "./Spiders/Log/Log";

const routes = [
  {
    path: "/spiders",
    name: "home",
    exact: true,
    component: Log,
  },
  {
    path: "/spiders/weave",
    name: "weave",
    exact: false,
    component: Weave,
  },
];

export default routes;
