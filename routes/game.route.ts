import { Request, Response, Router} from "express";

const router = Router();

router.get("/");
router.get("/:id");
router.get("/:id/comment")
router.get("/:id/highscore")
router.post("/");
router.put("/:id/rating");
router.post("/:id/comment");
router.post("/:id/highscore");
router.delete("/:id");