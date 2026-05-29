import { prisma } from "../lib/prisma";
import { usersCreateInput, usersUpdateInput } from "../generated/prisma/models";

interface DALReturn {
    status: boolean,
    data? : any
}
export const createUser = async(user :  usersCreateInput): Promise<DALReturn> => {
    try{
        const createdUser = await prisma.users.create({
            data: {
                ...user,
                enabled: true,
            }
        });
        return {
            status: true,
            data: createdUser
        }
    }
    catch(error){
        console.log(error);
        return {
            status: false
        }
    }
}

export const updateUser = async ( id: string ,user : usersUpdateInput) => {
     try{
        await prisma.users.update({
            where: {user_id: id},
            data: {...user}
        });
    }
    catch(error){
        console.log(error);
    }
}

export const removeUser = async(id: string) => {
     try{
        await prisma.users.update({
            where: {user_id: id},
            data: {is_deleted: true}
        });
    }
    catch(error){
        console.log(error);
    }
}

export const fetchUserByUserID = async (id: string) => {
    try{
        const user = await prisma.users.findUnique({where: {user_id: id}});
        return user;
    }
    catch (error){
        console.log(error);
    }
}
export const fetchUserByUsername = async(username: string) => {
    try{
        const user = prisma.users.findUnique({where: {username: username}});
        return user;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchUserByEmail = async (email: string) => {
    try{
        const user = await prisma.users.findUnique({where: {email: email}});
        return user;
    }
    catch (error){
        console.log(error);
    }
}

export const fetchAllUsers = async() => {
    try{
        const users = await prisma.users.findMany();
        return users;
    }
    catch(error){
        console.log(error);
    }
}