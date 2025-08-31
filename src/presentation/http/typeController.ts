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

	updateType: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const typeData = req.body;
			console.log(`Updating type ${id} with:`, typeData);
			const result = await typeService.updateType(Number(id), typeData);

			if (!result) {
				res.status(404).json({ error: "Type not found" });
				return;
			}

			res.status(200).send(result);
		} catch (error) {
			console.error("Error in updateType:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
