import { Router } from "express";

export const router = Router();

router.get("/");
router.get("/:id");
router.post("/:id/resolve");