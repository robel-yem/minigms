import { Router } from "express";
import { router as authRouter } from "./auth.route";

export const mainRouter = Router();
mainRouter.use("/api/auth", authRouter);