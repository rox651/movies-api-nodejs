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

	updateGenre: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const genreData = req.body;
			console.log(`Updating genre ${id} with:`, genreData);
			const result = await genreService.updateGenre(Number(id), genreData);

			if (!result) {
				res.status(404).json({ error: "Genre not found" });
				return;
			}

			res.status(200).send(result);
		} catch (error) {
			console.error("Error in updateGenre:", error);
			res.status(500).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
