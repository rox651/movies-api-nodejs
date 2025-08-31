import type { Request, Response } from "express";

import { mediaService } from "../../app/composition";
import type { MediaRequestParamsDTO, CreateMediaDTO } from "../dto/media";

export const mediaController = {
	getAllMedia: async (_req: Request, res: Response) => {
		const params: MediaRequestParamsDTO = _req.query;

		const result = await mediaService.getAllMedia(params);

		res.status(200).send(result);
	},

	getMediaById: async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = Number(id);

		const result = await mediaService.getMediaById(idInt);

		res.status(200).send(result);
	},

	addNewMedia: async (req: Request, res: Response) => {
		try {
			const newMedia: CreateMediaDTO = req.body;
			console.log("Received media data:", newMedia);
			const result = await mediaService.addNewMedia(newMedia);
			res.status(201).send(result);
		} catch (error) {
			console.error("Error creating media:", error);
			res.status(500).json({
				error: "Failed to create media",
				details: error instanceof Error ? error.message : String(error),
			});
		}
	},
};
