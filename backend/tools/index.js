import { ec2Declarations,ec2Handlers } from "./ec2/index.js";

export const toolDeclarations = [
    ...ec2Declarations
]

export const toolHandlers = {
    ...ec2Handlers
}
