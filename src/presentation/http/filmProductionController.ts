import type { Request, Response } from "express";
import { filmProductionService } from "../../app/composition";

export const filmProductionController = {
	addNewFilmProduction: async (req: Request, res: Response) => {
		try {
			const newFilmProduction = req.body;
			const result =
				await filmProductionService.addNewFilmProduction(newFilmProduction);
			res.status(201).send(result);
		} catch (error) {
			console.error("Error in addNewFilmProduction:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
