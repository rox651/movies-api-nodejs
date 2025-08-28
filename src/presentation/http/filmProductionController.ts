import type { Request, Response } from "express";
import { filmProductionService } from "../../app/composition";

export const filmProductionController = {
	addNewFilmProduction: async (req: Request, res: Response) => {
		const newFilmProduction = req.body;
		const result =
			await filmProductionService.addNewFilmProduction(newFilmProduction);
		res.status(201).send(result);
	},
};
