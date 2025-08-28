import { eq, ilike, inArray, sql } from "drizzle-orm";

import type { MediaDTO, MediaParamsDTO } from "../../domain/entities/media";
import type { IMediaRepository } from "../../domain/ports/IMediaRepository";
import type { Database } from "../db";
import type { CreateMediaDTO } from "../../presentation/dto/media";

import { media } from "../db/tables/media";
import { MEDIA_LIMIT } from "../../domain/constants";
import { director, genre, mediaGenre, typeTable } from "../db/tables";

export class DrizzleMediaRepository implements IMediaRepository {
	constructor(private db: Database) {}

	private getMediaQuery() {
		return this.db
			.selectDistinct({
				id: media.id,
				title: media.title,
				synopsis: media.synopsis,
				url: media.url,
				image: media.image,
				state: media.state,
				createdAt: media.createdAt,
				updatedAt: media.updatedAt,
				releaseDate: media.releaseDate,
				type: sql<string>`COALESCE(${typeTable.name}, '')::text`,
				genres: sql<string[]>`ARRAY_AGG(DISTINCT ${genre.name})::text[]`,
				director: sql<string>`COALESCE((SELECT ${director.names} || ' ' || ${director.lastnames}))::text`,
			})
			.from(media)
			.leftJoin(typeTable, eq(typeTable.id, media.typeId))
			.leftJoin(mediaGenre, eq(media.id, mediaGenre.mediaId))
			.leftJoin(genre, eq(mediaGenre.genreId, genre.id))
			.leftJoin(director, eq(media.directorId, director.id))
			.groupBy(
				media.id,
				media.title,
				media.synopsis,
				media.url,
				media.image,
				media.state,
				media.createdAt,
				media.updatedAt,
				media.releaseDate,
				typeTable.name,
				director.names,
				director.lastnames,
			)
			.$dynamic();
	}

	async getAllMedia(params: MediaParamsDTO): Promise<MediaDTO[]> {
		const {
			title,
			releaseDate,
			typeId,
			genreIds,
			limit = MEDIA_LIMIT,
			offset = 0,
		} = params;

		let query = this.getMediaQuery();

		if (title) {
			query = query.where(ilike(media.title, `%${title}%`));
		}

		if (releaseDate) {
			query = query.where(
				eq(sql`EXTRACT(YEAR FROM ${media.releaseDate})`, releaseDate),
			);
		}

		if (typeId) {
			query = query.where(eq(media.typeId, typeId));
		}

		if (genreIds) {
			query = query.where(inArray(mediaGenre.genreId, genreIds));
		}

		const results = await query.limit(limit).offset(offset);

		return results;
	}

	async getMediaById(id: number): Promise<MediaDTO | null> {
		const query = this.getMediaQuery();

		const result = await query.where(eq(media.id, id)).limit(1);

		return result[0];
	}

	async addNewMedia(createMediaDTO: CreateMediaDTO): Promise<MediaDTO> {
		const { genreIds, ...mediaData } = createMediaDTO;
		const now = new Date();

		// Start a transaction to ensure all operations succeed or fail together
		return await this.db.transaction(async (tx) => {
			// Insert the media record
			const [newMedia] = await tx
				.insert(media)
				.values({
					...mediaData,
					createdAt: now,
					updatedAt: now,
				})
				.returning();

			// Insert genre relationships
			if (genreIds.length > 0) {
				await tx.insert(mediaGenre).values(
					genreIds.map((genreId) => ({
						mediaId: newMedia.id,
						genreId,
					})),
				);
			}

			// Get the complete media with all relationships
			const mediaWithRelations = await this.getMediaById(newMedia.id);
			if (!mediaWithRelations) {
				throw new Error("Failed to create media");
			}

			return mediaWithRelations;
		});
	}
}
