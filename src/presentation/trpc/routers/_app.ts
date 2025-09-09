import { router } from "../trpc";
import { mediaRouter } from "./media";
import { directorRouter } from "./director";
import { genreRouter } from "./genre";
import { filmProductionRouter } from "./filmProduction";
import { typeRouter } from "./type";

export const appRouter = router({
   media: mediaRouter,
   director: directorRouter,
   genre: genreRouter,
   filmProduction: filmProductionRouter,
   type: typeRouter,
});

export type AppRouter = typeof appRouter;
