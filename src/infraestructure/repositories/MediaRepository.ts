import { Media } from "../../domain/entities/Media";
import type { DB } from "../db/postgresClient";
import type { MediaQueryDTO } from "../../domain/dtos/MediaDTO";
import { MEDIA_LIMIT } from "../../domain/constants";
import type { State } from "../../domain/types/State";

interface MediaRow {
	id: number;
	title: string;
	description: string | null;
	state: State;
	release: Date;
	url: string;
	image: string;
	synopsis: string | null;
	typeId: number;
	directorId: number;
	genres: number[];
	createdAt: Date;
}

interface QueryBuilder {
	conditions: string[];
	values: unknown[];
	paramCount: number;
}

interface IMediaRepository {
	getAll(query: MediaQueryDTO): Promise<Media[]>;
	getById(id: number): Promise<Media | null>;
}

export class MediaRepository implements IMediaRepository {
	private readonly SELECT_FIELDS = `
      m.id,
      m.title,
      m.description,
      m.state,
      m.release_date as release,
      m.url,
      m.image,
      m.synopsis,
      t.type_id as "Type",
      d.names as "Director",
      m.created_at as "createdAt",
      ARRAY_AGG(g.id) FILTER (WHERE g.id IS NOT NULL) as genres
   `.trim();

	private readonly TABLE_JOINS = `
      FROM media m
      LEFT JOIN media_genre mg ON m.id = mg.media_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      LEFT JOIN director d ON m.director_id = d.id
      LEFT JOIN type t ON m.type_id = t.id
   `.trim();

	constructor(private readonly db: DB) {}

	private buildBaseQuery(): string {
		return `
         SELECT DISTINCT ${this.SELECT_FIELDS}
         ${this.TABLE_JOINS}
      `.trim();
	}

	private initQueryBuilder(): QueryBuilder {
		return {
			conditions: [],
			values: [],
			paramCount: 1,
		};
	}

	private addCondition(
		builder: QueryBuilder,
		field: string,
		value: unknown,
	): void {
		builder.conditions.push(`${field} $${builder.paramCount}`);
		builder.values.push(value);
		builder.paramCount++;
	}

	private buildWhereClause(builder: QueryBuilder): string {
		return builder.conditions.length > 0
			? `WHERE ${builder.conditions.join(" AND ")}`
			: "";
	}

	private buildFilterConditions(query: MediaQueryDTO): QueryBuilder {
		const builder = this.initQueryBuilder();

		if (query.title) {
			this.addCondition(builder, "m.title ILIKE", `%${query.title}%`);
		}

		if (query.genreIds?.length > 0) {
			this.addCondition(builder, "g.id = ANY", query.genreIds);
		}

		if (query.typeId) {
			this.addCondition(builder, "m.type_id =", query.typeId);
		}

		if (query.directorId) {
			this.addCondition(builder, "m.director_id =", query.directorId);
		}

		if (query.release) {
			this.addCondition(builder, "m.release_date =", query.release);
		}

		this.addCondition(builder, "m.state =", query.state ?? "active");

		return builder;
	}

	private mapRowToMedia(row: MediaRow): Media {
		return new Media(
			row.id,
			row.title,
			row.description,
			row.state,
			row.release,
			row.url,
			row.image,
			row.synopsis,
			row.typeId,
			row.directorId,
			row.genres || [],
			row.createdAt,
		);
	}

	async getAll(query: MediaQueryDTO): Promise<Media[]> {
		try {
			const builder = this.buildFilterConditions(query);
			const { offset = 0, limit = MEDIA_LIMIT } = query.pagination;

			builder.values.push(offset, limit);

			const sql = `
            ${this.buildBaseQuery()}
            ${this.buildWhereClause(builder)}
            GROUP BY m.id
            ORDER BY m.created_at DESC
            OFFSET $${builder.paramCount}
            LIMIT $${builder.paramCount + 1}
         `;

			const rows = await this.db.any<MediaRow>(sql, builder.values);
			return rows.map(this.mapRowToMedia);
		} catch (error) {
			console.error("Error in MediaRepository.getAll:", error);
			throw new Error("Failed to fetch media list");
		}
	}

	async getById(id: number): Promise<Media | null> {
		try {
			const sql = `
            ${this.buildBaseQuery()}
            WHERE m.id = $1
            GROUP BY m.id
         `;

			const row = await this.db.oneOrNone<MediaRow>(sql, [id]);
			return row ? this.mapRowToMedia(row) : null;
		} catch (error) {
			console.error("Error in MediaRepository.getById:", error);
			throw new Error("Failed to fetch media by id");
		}
	}
}
