import { Request, Response, Router } from "express";
import { login, signUp } from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";

export const router = Router();
router.post("/login", login);
router.post("/signup", signUp);
router.post("/check-login", authenticate, (req: Request, res: Response) => {
    res.status(200).send("User is authenticated");
});