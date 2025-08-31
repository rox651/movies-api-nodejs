import { Router } from "express";
import { typeController } from "./typeController";

const router = Router();

router.post("/", typeController.addNewType);
router.put("/:id", typeController.updateType);

export default router;
