import type { Response } from "express";
function sendSuccess(res: Response, message?: string){
    res.status(200).end(message ?? "Resource fetched successfully");
}

function sendCreated(res: Response, message?: string){
    res.status(201).end(message ?? "Resource created successfully");
}

function badRequest(res: Response, message?: string){
    res.status(400).end(message ?? "Bad user request.");
}

function unauthenticated(res: Response, message?: string){
    res.status(401).end(message ?? "Unauthenticated user.");
}

function notFound(res: Response, message?: string){
    res.status(404).end(message ?? "Resource not found.");
}

function serverError(res: Response, message?: string){
    res.status(500).end(message ?? "Internal server error.");
}

function unauthorized(res: Response, message?: string){
    res.status(403).end(message ?? "User not authorized to take this action");
}

const responseHandler = {
    sendSuccess,
    sendCreated,
    unauthenticated,
    badRequest,
    notFound,
    serverError,
    unauthorized
}
export default responseHandler;