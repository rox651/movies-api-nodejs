import { Router } from "express";
import { filmProductionController } from "./filmProductionController";

const router = Router();

router.post("/", filmProductionController.addNewFilmProduction);
router.put("/:id", filmProductionController.updateFilmProduction);

export default router;
