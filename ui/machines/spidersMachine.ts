import { Machine, interpret } from "xstate";

const spidersBlueprint = Machine({});

const spidersMachine = interpret(spidersBlueprint);

export { spidersMachine };
