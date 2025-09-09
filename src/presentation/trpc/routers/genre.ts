import { publicProcedure, router } from "../trpc";
import { object, number, parse } from "valibot";
import { createGenreSchema, updateGenreSchema } from "../../../domain/validation/genreValidator";

export const genreRouter = router({
   create: publicProcedure
      .input(raw => parse(createGenreSchema, raw))
      .mutation(({ ctx, input }) => ctx.services.genreService.addNewGenre(input)),
   update: publicProcedure
      .input(raw => parse(object({ id: number(), data: updateGenreSchema }), raw))
      .mutation(({ ctx, input }) => ctx.services.genreService.updateGenre(input.id, input.data)),
});
