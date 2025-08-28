import type { Request, Response } from "express";
import { typeService } from "../../app/composition";

export const typeController = {
	addNewType: async (req: Request, res: Response) => {
		const newType = req.body;
		const result = await typeService.addNewType(newType);
		res.status(201).send(result);
	},
};
