import type { Request, Response } from "express";
import { ListMedia } from "../../application/use-cases/media/ListMedia";
import { MediaRepository } from "../../infraestructure/repositories/MediaRepository";
import db from "../../infraestructure/db/postgresClient";
import type { MediaQueryDTO } from "../../domain/dtos/MediaDTO";
import type { MediaResponseDTO } from "../dtos/MediaResponseDTO";
import type { ErrorResponseDTO } from "../dtos/ErrorResponseDTO";

// Dependency Injection
const mediaRepo = new MediaRepository(db);
const listMedia = new ListMedia(mediaRepo);

export class MediaController {
	async getMedia(req: Request, res: Response) {
		try {
			// Extract query parameters
			const {
				title,
				genreIds,
				typeId,
				directorId,
				release,
				state,
				page = 0,
				limit = 10,
			} = req.query;

			// Build query DTO
			const query: MediaQueryDTO = {
				title: title as string,
				genreIds: genreIds
					? Array.isArray(genreIds)
						? genreIds.map(Number)
						: [Number(genreIds)]
					: [],
				typeId: typeId ? Number(typeId) : undefined,
				directorId: directorId ? Number(directorId) : undefined,
				release: release ? new Date(release as string) : undefined,
				state: state as "active" | "inactive" | undefined,
				pagination: {
					offset: page ? Number(page) * Number(limit) : 0,
					limit: Number(limit),
				},
			};

			const media = await listMedia.execute(query);

			const response: MediaResponseDTO = {
				data: media,
				pagination: {
					page: Number(page),
					limit: Number(limit),
					total: media.length,
				},
			};

			res.json(response);
		} catch (error) {
			console.error("Error in MediaController.getMedia:", error);

			const errorResponse: ErrorResponseDTO = {
				error: "Failed to fetch media list",
				message: error instanceof Error ? error.message : "Unknown error",
			};

			res.status(500).json(errorResponse);
		}
	}
}

export const mediaController = new MediaController();
