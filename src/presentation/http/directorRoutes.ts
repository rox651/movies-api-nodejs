import { Router } from "express";
import { directorController } from "./directorController";

const router = Router();

router.post("/", directorController.addNewDirector);

export default router;
