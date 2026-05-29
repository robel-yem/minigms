import { UUID } from "crypto";

export interface IUser{
    userID: UUID;
    username: string;
    email: string;
    passHash?: string;
    birthDate: Date;
    avatar?: string;
    gender: "M" | "F",
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
