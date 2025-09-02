import { eq, ilike, inArray, sql } from "drizzle-orm";

import type {
	MediaDTO,
	MediaParamsDTO,
	UpdateMediaDTO,
} from "../../domain/entities/media";
import type { IMediaRepository } from "../../domain/ports/IMediaRepository";
import type { DbOrTx } from "../db";
import type { CreateMediaDTO } from "../../presentation/dto/media";

import { genre } from "../db/tables/genre";
import { media } from "../db/tables/media";
import { MEDIA_LIMIT } from "../../domain/constants";
import { director } from "../db/tables/director";
import { typeTable } from "../db/tables/typeTable";
import { filmProduction } from "../db/tables/film_production";
import { mediaGenre } from "../db/tables/media_genre";
import { mediaFilmProduction } from "../db/tables/media_film_production";

export class DrizzleMediaRepository implements IMediaRepository {
	constructor(private db: DbOrTx) {}

	private getMediaQuery(connection: DbOrTx = this.db) {
		return connection
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
				filmProductionName:
					sql<string>`COALESCE(${filmProduction.name}, '')`.as(
						"filmProductionName",
					),
				type: sql<string>`COALESCE(${typeTable.name}, '')`.as("type"),
				genres: sql<
					string[]
				>`COALESCE(ARRAY_AGG(DISTINCT ${genre.name}) FILTER (WHERE ${genre.name} IS NOT NULL), ARRAY[]::text[])`.as(
					"genres",
				),
				director:
					sql<string>`COALESCE(${director.names} || ' ' || ${director.lastnames}, '')`.as(
						"director",
					),
			})
			.from(media)
			.leftJoin(typeTable, eq(typeTable.id, media.typeId))
			.leftJoin(mediaGenre, eq(media.id, mediaGenre.mediaId))
			.leftJoin(genre, eq(mediaGenre.genreId, genre.id))
			.leftJoin(director, eq(media.directorId, director.id))
			.leftJoin(mediaFilmProduction, eq(media.id, mediaFilmProduction.mediaId))
			.leftJoin(
				filmProduction,
				eq(mediaFilmProduction.filmProductionId, filmProduction.id),
			)
			.groupBy(
				media.id,
				filmProduction.name,
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
		const { genreIds, filmProductionIds, ...mediaData } = createMediaDTO;
		const now = new Date();

		return await this.db.transaction(async (tx) => {
			const [newMedia] = await tx
				.insert(media)
				.values({
					title: mediaData.title,
					synopsis: mediaData.synopsis,
					url: mediaData.url,
					image: mediaData.image,
					state: mediaData.state ?? "active",
					directorId: mediaData.directorId,
					typeId: mediaData.typeId,
					createdAt: now,
					updatedAt: now,
					// let DB default handle releaseDate if not provided
					...(mediaData.releaseDate
						? { releaseDate: mediaData.releaseDate }
						: {}),
				})
				.returning();

			if (genreIds.length > 0) {
				await tx.insert(mediaGenre).values(
					genreIds.map((genreId: number) => ({
						mediaId: newMedia.id,
						genreId,
					})),
				);
			}

			if (filmProductionIds.length > 0) {
				await tx.insert(mediaFilmProduction).values(
					filmProductionIds.map((filmProductionId: number) => ({
						mediaId: newMedia.id,
						filmProductionId,
					})),
				);
			}

			const result = await this.getMediaQuery(tx)
				.where(eq(media.id, newMedia.id))
				.limit(1);

			if (!result[0]) {
				throw new Error("Failed to create media");
			}

			return result[0];
		});
	}

	async updateMedia(
		id: number,
		updateMediaDTO: UpdateMediaDTO,
	): Promise<MediaDTO | null> {
		const { genreIds, filmProductionIds, ...mediaData } = updateMediaDTO;

		return await this.db.transaction(async (tx) => {
			await tx
				.update(media)
				.set({
					...mediaData,
					updatedAt: new Date(),
				})
				.where(eq(media.id, id));

			if (genreIds?.length && genreIds.length >= 0) {
				await tx.delete(mediaGenre).where(eq(mediaGenre.mediaId, id));

				if (genreIds.length > 0) {
					await tx.insert(mediaGenre).values(
						genreIds.map((genreId: number) => ({
							mediaId: id,
							genreId,
						})),
					);
				}
			}

			if (filmProductionIds?.length && filmProductionIds.length >= 0) {
				await tx
					.delete(mediaFilmProduction)
					.where(eq(mediaFilmProduction.mediaId, id));

				if (filmProductionIds.length > 0) {
					await tx.insert(mediaFilmProduction).values(
						filmProductionIds.map((filmProductionId: number) => ({
							mediaId: id,
							filmProductionId,
						})),
					);
				}
			}

			const result = await this.getMediaQuery(tx)
				.where(eq(media.id, id))
				.limit(1);

			return result[0] || null;
		});
	}
}
