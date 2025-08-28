import { Router } from "express";
import { genreController } from "./genreController";

const router = Router();

router.post("/", genreController.addNewGenre);

export default router;
