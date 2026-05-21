import { UUID } from "crypto";

export interface IUser{
    userID: UUID;
    username: string;
    email: string;
    passHash?: string;
    birthdate: Date;
    avatar?: string;
    gender: "M" | "F",
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
