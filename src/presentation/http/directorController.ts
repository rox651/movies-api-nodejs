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
};
