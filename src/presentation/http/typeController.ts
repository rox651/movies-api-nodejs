import type { Request, Response } from "express";
import { typeService } from "../../app/composition";

export const typeController = {
	addNewType: async (req: Request, res: Response) => {
		try {
			const newType = req.body;
			const result = await typeService.addNewType(newType);
			res.status(201).send(result);
		} catch (error) {
			console.error("Error in addNewType:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
