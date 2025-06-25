import createBucket from "./createBucket.js";
import deleteBucket from "./deleteBucket.js";

export const s3Declarations = [
    createBucket.functionDeclaration,
    deleteBucket.functionDeclaration
]

export const s3Handlers = {
    [createBucket.functionDeclaration.name]: createBucket.handler,
    [deleteBucket.functionDeclaration.name]: deleteBucket.handler
}