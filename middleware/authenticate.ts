import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";
import responseHandler from "../utils/responseHandler";
import { emitWarning } from "node:process";

interface TokenData{
    id: string,
    username: string,
    email: string,
    role: "user" | "admin"
}

export const authenticate = function (req: Request & {user?: {id: string}}, res: Response, next: NextFunction){
    const authorization = req.headers.authorization;
    if (!authorization){
        return responseHandler.unauthenticated(res, "Authorization header is missing");
    }
    const splitAuth = (req.headers.authorization as string).split(" ");
    if (splitAuth[0].toLowerCase()!== "bearer" || !splitAuth[1]){
        return responseHandler.unauthenticated(res, "Incorrect authorization header");
    }
    console.log("splitAuth[1]", splitAuth[1]);
    try{
        const payload = jwt.verify(splitAuth[1] , process.env.JWT_SECRET as string) as TokenData & jwt.JwtPayload;
        req.user = {
            id: payload.id
        }
        next();
    }
    catch(error){
        return responseHandler.unauthenticated(res, "Token is invalid");
    }
    
}
export const authorize = (role: "user" | "admin") => {
    return function (req: Request, res: Response, next: NextFunction){
        const accessToken = req.params.accessToken;
        if (!accessToken){
            responseHandler.unauthenticated(res, "User is unauthenticated");
        }
        try{
            const payload = jwt.verify(accessToken as string, process.env.JWT_SECRET as string) as TokenData & jwt.JwtPayload;
            if (payload.role !== role){
                return responseHandler.unauthorized(res);
            }
            next();
        }
        catch(error){
            return responseHandler.unauthenticated(res, "Token is invalid");
        }  
    }
}