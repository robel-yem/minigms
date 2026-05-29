import { Request, Response, Router } from "express";

const router = Router();
router.get("/:id");
router.get("/:id/comment");
router.get("/:id/rating");
router.get("/:id/game");
router.get("/:id/favorite");
router.post("/:id/favorite");
router.post("/:id/report");
router.patch("/:id");
router.patch("/:id");
router.patch("/:id/enable");
router.patch("/:id/disable");
