import describe from "./describe.js";
import launch from "./launch.js";
import start from "./start.js";
import stop from "./stop.js";
import terminate from "./terminate.js";

export const ec2Declarations = [
  launch.functionDeclaration,
  start.functionDeclaration,
  stop.functionDeclaration,
  describe.functionDeclaration,
  terminate.functionDeclaration
];

export const ec2Handlers = {
  [launch.functionDeclaration.name]: launch.handler,
  [start.functionDeclaration.name]: start.handler,
  [stop.functionDeclaration.name]: stop.handler,
  [describe.functionDeclaration.name]: describe.handler,
  [terminate.functionDeclaration.name]: terminate.handler
};
