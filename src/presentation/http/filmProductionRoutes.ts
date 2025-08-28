import { Router } from "express";
import { filmProductionController } from "./filmProductionController";

const router = Router();

router.post("/", filmProductionController.addNewFilmProduction);

export default router;
