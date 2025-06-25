import { ec2Declarations,ec2Handlers } from "./ec2/index.js";
import { s3Declarations,s3Handlers } from "./s3/index.js";

export const toolDeclarations = [
    ...ec2Declarations,
    ...s3Declarations
]

export const toolHandlers = {
    ...ec2Handlers,
    ...s3Handlers
}
