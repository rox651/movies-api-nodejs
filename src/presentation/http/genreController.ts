import type { Request, Response } from "express";
import { genreService } from "../../app/composition";

export const genreController = {
	addNewGenre: async (req: Request, res: Response) => {
		try {
			const newGenre = req.body;
			const result = await genreService.addNewGenre(newGenre);
			res.status(201).send(result);
		} catch (error) {
			console.error("Error in addNewGenre:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
