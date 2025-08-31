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

	updateFilmProduction: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const filmProductionData = req.body;
			console.log(`Updating film production ${id} with:`, filmProductionData);
			const result = await filmProductionService.updateFilmProduction(
				Number(id),
				filmProductionData,
			);

			if (!result) {
				res.status(404).json({ error: "Film production not found" });
				return;
			}

			res.status(200).send(result);
		} catch (error) {
			console.error("Error in updateFilmProduction:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
