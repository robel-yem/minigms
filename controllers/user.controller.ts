import { Request, Response } from "express";
import responseHandler from "../utils/responseHandler";
import { fetchUserByUserID, fetchUserByUsername, fetchUserByEmail, updateUser } from "../DAL/user.dal";
import { usersUpdateInput } from "../generated/prisma/models";

const updateUserProfile = async (req: Request, res: Response) => {
    const _payload = req.body;
    const updateData: usersUpdateInput = {};
    const _userId: string = (req as any).user.id;
    try{
        if (_payload.username){
            const usernameExists = await fetchUserByUsername(_payload.username);
            if(usernameExists){
                return responseHandler.badRequest(res, "Username is taken");
            }
            updateData.username = _payload.username;
        }
        if (_payload.birthDate){
            updateData.birth_date = new Date(_payload.birth_date);
        }
        if (_payload.avatar){
            updateData.avatar = _payload.avatar
        }
        await updateUser(_userId, updateData);
    }
    catch(error){
        console.log(error);
        return responseHandler.serverError(res);
    }

}

export const enableDisableUser = async(req: Request, res: Response) => {
    const isEnable = req.url.includes("enable");
    const _userID = (req as any).user.id;
    const updateData: usersUpdateInput = { enabled: isEnable};

    try{
        await updateUser(_userID, updateData);
    }
    catch(error){
        console.log(error);
        return responseHandler.serverError(res);
    }
}