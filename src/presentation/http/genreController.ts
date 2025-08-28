import type { Request, Response } from "express";
import { genreService } from "../../app/composition";

export const genreController = {
	addNewGenre: async (req: Request, res: Response) => {
		const newGenre = req.body;
		const result = await genreService.addNewGenre(newGenre);
		res.status(201).send(result);
	},
};
