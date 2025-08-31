import { Router } from "express";
import { mediaController } from "./mediaController";

const router = Router();

router.get("/", mediaController.getAllMedia);
router.get("/:id", mediaController.getMediaById);
router.post("/", mediaController.addNewMedia);
router.put("/:id", mediaController.updateMedia);

export default router;
