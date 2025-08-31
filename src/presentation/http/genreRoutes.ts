import { Router } from "express";
import { genreController } from "./genreController";

const router = Router();

router.post("/", genreController.addNewGenre);
router.put("/:id", genreController.updateGenre);

export default router;
