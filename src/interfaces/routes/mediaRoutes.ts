import { Router } from "express";
import { mediaController } from "../controllers/mediaController";

const router = Router();

router.get("/", mediaController.getMedia);

export default router;
