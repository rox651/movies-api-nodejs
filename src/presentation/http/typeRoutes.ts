import { Router } from "express";
import { typeController } from "./typeController";

const router = Router();

router.post("/", typeController.addNewType);

export default router;
