import type { Request, Response } from "express";
import { directorService } from "../../app/composition";

export const directorController = {
	addNewDirector: async (req: Request, res: Response) => {
		try {
			const newDirector = req.body;
			console.log("Received request body:", newDirector);
			const result = await directorService.addNewDirector(newDirector);
			res.status(201).send(result);
		} catch (error) {
			console.error("Error in addNewDirector:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},

	updateDirector: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const directorData = req.body;
			console.log(`Updating director ${id} with:`, directorData);
			const result = await directorService.updateDirector(
				Number(id),
				directorData,
			);

			if (!result) {
				res.status(404).json({ error: "Director not found" });
				return;
			}

			res.status(200).send(result);
		} catch (error) {
			console.error("Error in updateDirector:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
