import { Router } from "express";
import { directorController } from "./directorController";

const router = Router();

router.post("/", directorController.addNewDirector);
router.put("/:id", directorController.updateDirector);

export default router;
