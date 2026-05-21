import { readFile } from "fs/promises";
import { IUser } from "../interface";
import path from "node:path";
import { writeFile } from "node:fs/promises";

const filePath = path.resolve(__dirname, "data", "users.json");
export const createUser = async(user : IUser) => {
    try{
        const data = await readFile(filePath, "utf8");
        const parsedData: IUser[] = JSON.parse(data);
        parsedData.push(user);

        await writeFile(filePath, JSON.stringify(parsedData, null, 2), "utf8");
    }
    catch(error){
        console.log(error);
    }
}

export const updateUser = async ( id: string ,user : Partial<IUser> & Record<string, any>) => {
     try{
        const data = await readFile(filePath, "utf8");
        const parsedData: IUser[] = JSON.parse(data);
        let match = parsedData.find(user => user.userID === id) as Record<string, any>;

        if(match){
            for (const key in user){
                match[key] = user[key];
            }
        }

        await writeFile(filePath, JSON.stringify(parsedData, null, 2), "utf8");
    }
    catch(error){
        console.log(error);
    }
}

export const removeUser = async(id: string) => {
     try{
        const data = await readFile(filePath, "utf8");
        const parsedData: IUser[] = JSON.parse(data);
        const index = parsedData.findIndex(user => user.userID === id);

        if(index ){
            parsedData.splice(index);
        }

        await writeFile(filePath, JSON.stringify(parsedData, null, 2), "utf8");
    }
    catch(error){
        console.log(error);
    }
}

export const fetchUser = async(id: string) => {
    try{
        const data = await readFile(filePath, "utf8");
        const parsedData: IUser[] = JSON.parse(data);
        const match = parsedData.find(user => user.userID === id);

        if(match ){
            return match;
        }
    }
    catch(error){
        console.log(error);
    }
}

export const fetchAllUsers = async() => {
    try{
        const data = await readFile(filePath, "utf8");
        const parsedData: IUser[] = JSON.parse(data);

        return parsedData;
    }
    catch(error){
        console.log(error);
    }
}