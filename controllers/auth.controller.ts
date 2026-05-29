import { response, type Request, type Response } from "express";
import { createUser, updateUser, removeUser, fetchUserByUsername, fetchAllUsers, fetchUserByUserID} from "../DAL/user.dal"
import responseHandler from "../utils/responseHandler";
import { IUser } from "../interface";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { usersCreateInput } from "../generated/prisma/models";

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try{
        const user = await fetchUserByUsername(username);
        if (!user){
            return res.status(404).send("User not found");
        }

        if( user.hash && !(await argon2.verify(user.hash, password))){
            return res.status(400).send("Incorrect credentials")
        }
        const payload = {
            id: user.user_id,
            username: user.username,
            email: user.email
        }
        const token= jwt.sign(payload, process.env.JWT_SECRET as string, {
            algorithm: "HS256",
            expiresIn: "15m",
            issuer: "minigms-api"
        }  )
        return res.status(200).json({
            id: user.user_id,
            username: user.username,
            accessToken: token
        });
    }
    catch(error){
        console.log(error);
        responseHandler.serverError(res);
    }

    
}

const signUp = async (req: Request, res: Response) => {
    const _payload = req.body;
    try{
        if (!_payload || !_payload.username || !_payload.email || !_payload.password){
            return responseHandler.badRequest(res, "User data is missing")
        }
        const usernameUser = await fetchUserByUsername(_payload.username);
        const emailUser = await fetchUserByUsername(_payload.email);
        if (usernameUser) {
            return responseHandler.badRequest(res, "Username already taken");
        }
        if (emailUser){
            return responseHandler.badRequest(res, "Email already taken")
        }

        const birthDate = new Date(_payload.birthDate);
        const passHash = await argon2.hash(_payload.password);

        const createData: usersCreateInput = {
            username: _payload.username as string,
            email: _payload.email as string,
            birth_date: birthDate,
            hash: passHash,
            role: "user"
        } 

        await createUser(_payload);
        return responseHandler.sendCreated(res);
    }
    catch(error){
        console.log("SERVER ERROR==============>", error);
        responseHandler.serverError(res);
    }
    
}

const changePassword = async (req: Request & { user: {id: string}}, res: Response) => {
    const {newPassword, oldPassword} = req.body;
    const _userId =  req.user.id;
    try{
        const user = await fetchUserByUserID(_userId);
        if (!user){
            return responseHandler.notFound(res, "User not found");
        }
        const isRightPassword = await argon2.verify(user.hash!, oldPassword);
        if (!isRightPassword){
            return responseHandler.badRequest(res, "Incorrect old password");
        }
        const hashedPassword = await argon2.hash(newPassword);
        await updateUser(_userId, {
            hash: hashedPassword
        });
    }
    catch(error){
        console.log(error);
        return responseHandler.serverError(res);
    }

}

export {
    login,
    signUp,
    changePassword
}