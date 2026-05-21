import { type Request, type Response } from "express";
import { createUser, updateUser, removeUser, fetchUser, fetchAllUsers} from "../DAL/user.dal"
import responseHandler from "../utils/responseHandler";
import { IUser } from "../interface";
import { randomUUID, hash} from "node:crypto";

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userFOund = (await fetchAllUsers())?.find(user => user.username === username)

    
}

const signUp = async (req: Request, res: Response) => {
    const user: any = {};
    const _payload = req.body;
    try{
        const usernameFound = (await fetchAllUsers())?.find(user => user.username === req.body.username as string);
        const emailFound = (await fetchAllUsers())?.find(user => user.email === req.body.email as string);

        if (usernameFound){
            return responseHandler.badRequest(res, "username already taken.");
        }
        if (emailFound){
            return responseHandler.badRequest(res, "email already in use");
        }

        user.username = _payload.username;
        user.email = _payload.email;
        user.age = _payload.age;
        user.gender = _payload.gender;
        user.birthDate = _payload.birthDate;
        user.createdAt = new Date();
        user.enabled = true;
        user.updatedAt = new Date();
        user.passHash = hash("sha-256", _payload.password);
        
        await createUser(_payload as IUser);
        return responseHandler.sendCreated(res);
    }
    catch(error){
        console.log("SERVER ERROR==============>", error);
        responseHandler.serverError(res);
    }
    
}