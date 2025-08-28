import db from "../infrastructure/db";

import { DrizzleMediaRepository } from "../infrastructure/repositories/DrizzleMediaRepository";
import { DrizzleDirectorRepository } from "../infrastructure/repositories/DrizzleDirectorRepository";
import { DrizzleFilmProductionRepository } from "../infrastructure/repositories/DrizzleFilmProductionRepository";
import { DrizzleGenreRepository } from "../infrastructure/repositories/DrizzleGenreRepository";
import { DrizzleTypeRepository } from "../infrastructure/repositories/DrizzleTypeRepository";

import { MediaService } from "../application/services/mediaService";
import { DirectorService } from "../application/services/directorService";
import { FilmProductionService } from "../application/services/filmProductionService";
import { GenreService } from "../application/services/genreService";
import { TypeService } from "../application/services/typeService";

// Repositories
const mediaRepository = new DrizzleMediaRepository(db);
const directorRepository = new DrizzleDirectorRepository(db);
const filmProductionRepository = new DrizzleFilmProductionRepository(db);
const genreRepository = new DrizzleGenreRepository(db);
const typeRepository = new DrizzleTypeRepository(db);

// Services
export const mediaService = new MediaService(mediaRepository);
export const directorService = new DirectorService(directorRepository);
export const filmProductionService = new FilmProductionService(
	filmProductionRepository,
);
export const genreService = new GenreService(genreRepository);
export const typeService = new TypeService(typeRepository);
