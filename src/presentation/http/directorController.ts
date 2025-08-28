import type { Request, Response } from "express";
import { directorService } from "../../app/composition";

export const directorController = {
	addNewDirector: async (req: Request, res: Response) => {
		const newDirector = req.body;
		const result = await directorService.addNewDirector(newDirector);
		res.status(201).send(result);
	},
};
