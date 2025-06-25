import launch from "./launch.js";

export const ec2Declarations = [
    launch.functionDeclaration
]

export const ec2Handlers = {
    [launch.functionDeclaration.name]: launch.handler
}