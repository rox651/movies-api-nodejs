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
		const newMedia: CreateMediaDTO = req.body;
		const result = await mediaService.addNewMedia(newMedia);
		res.status(201).send(result);
	},
};
